import { AxiosError } from 'axios';
import {authAPI, LoginParamsType} from '../../api/todolist-api';
import { ResultCode } from '../../enums/result-code';
import { handleAppError } from '../../utils/error-utils';
import { AppThunk } from '../store';
import { setAppErrorMessage, setAppStatus } from './app-reducer';

const InitialState: AuthStateType = {
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = InitialState, action: AuthActionsType): AuthStateType => {
    switch(action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn};
        default:
            return state;
    }
}


// ------- actions -------
export const setIsLoggedIn = (isLoggedIn: boolean) => ({
    type: 'AUTH/SET-IS-LOGGED-IN',
    payload: {
        isLoggedIn,
    },
} as const);


// ------- thunks -------
export const login = (data: LoginParamsType): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'));

    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn(true));
            }

            if (res.data.resultCode === ResultCode.Error) {
                handleAppError(res.data, dispatch);
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
};


// ------- types -------
type AuthStateType = {
    isLoggedIn: boolean
}

export type AuthActionsType = ReturnType<typeof setIsLoggedIn>