import {AxiosError} from 'axios';
import {authAPI} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {setIsLoggedIn} from './auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch, rejectWithValue}) => {

    try {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
        } else {
            return rejectWithValue(null);
        }
    } catch (e) {
        dispatch(setAppErrorMessage({error: (e as AxiosError).message}));
    } finally {
        dispatch(setInitializedApp({isInitialized: true}));
    }
})

const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        errorMessage: null,
        isInitialized: false,
    } as InitialStateType,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppErrorMessage(state, action: PayloadAction<{ error: string | null }>) {
            state.errorMessage = action.payload.error;
        },
        setInitializedApp(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        },
    },
})

export const {setAppStatus, setAppErrorMessage, setInitializedApp} = appSlice.actions;

export const appReducer = appSlice.reducer;

export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'