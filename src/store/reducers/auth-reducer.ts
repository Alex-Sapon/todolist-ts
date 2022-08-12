import {AxiosError} from 'axios';
import {authAPI, LoginParamsType} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {handleAppError} from '../../utils/error-utils';
import {AppThunk} from '../store';
import {setAppErrorMessage, setAppStatus} from './app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: AuthStateType = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
})

export const {setIsLoggedIn} = authSlice.actions;

export const authReducer = authSlice.reducer;

export const login = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
        }

        if (res.data.resultCode === ResultCode.Error) {
            handleAppError(res.data, dispatch);
        }
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
};

export const logout = (): AppThunk => async dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedIn({isLoggedIn: false}));
        }

        if (res.data.resultCode === ResultCode.Error) {
            handleAppError(res.data, dispatch);
        }
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
};

type AuthStateType = {
    isLoggedIn: boolean
}

export type AuthActionsType = ReturnType<typeof setIsLoggedIn>