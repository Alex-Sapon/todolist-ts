import {AxiosError} from 'axios';
import {authAPI} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {AppThunk} from '../store';
import {setIsLoggedIn} from './auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
        setInitialized(state, action: PayloadAction<{ initialized: boolean }>) {
            state.isInitialized = action.payload.initialized;
        },
    },
})

export const {setAppStatus, setAppErrorMessage, setInitialized} = appSlice.actions;

export const appReducer = appSlice.reducer;

export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({isLoggedIn: true}));
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage({error: err.message}));
        })
        .finally(() => {
            dispatch(setInitialized({initialized: true}));
        })
}

export type AppActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorMessage>
    | ReturnType<typeof setInitialized>

export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'