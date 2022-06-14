import {AxiosError} from 'axios';
import {authAPI} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {handleAppError} from '../../utils/error-utils';
import {AppThunk} from '../store';
import {setIsLoggedIn} from './auth-reducer';

const initialState: InitialStateType = {
    status: 'idle',
    errorMessage: null,
    isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status};
        case 'APP/SET-ERROR-MESSAGE':
            return {...state, errorMessage: action.payload.errorMessage};
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.payload.initialized};
        default:
            return state;
    }
}

// ------- actions -------
export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status,
    }
} as const);

export const setAppErrorMessage = (errorMessage: string | null) => ({
    type: 'APP/SET-ERROR-MESSAGE',
    payload: {
        errorMessage,
    }
} as const);

export const setInitialized = (initialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    payload: {
        initialized,
    }
} as const);


// ------- thunks -------
export const initializeApp = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn(true));
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setInitialized(true));
        })
}

// ------- types -------
export type AppActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorMessage>
    | ReturnType<typeof setInitialized>;

export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';