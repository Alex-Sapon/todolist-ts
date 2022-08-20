import {AxiosError} from 'axios';
import {authAPI} from '../api/todolist-api';
import {ResultCode} from '../enums/result-code';
import {setIsLoggedIn} from '../features/Login';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleAppError, handleAsyncServerNetworkError} from '../utils/error-utils';

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch, rejectWithValue}) => {

    try {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
        } else {
            return handleAppError(res.data, {dispatch, rejectWithValue});
        }
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(setInitializedApp({isInitialized: true}));
    }
})

export const appSlice = createSlice({
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

export const asyncAppActions = {initializeApp};

export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'