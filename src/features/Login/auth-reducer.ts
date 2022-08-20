import {AxiosError} from 'axios';
import {authAPI, LoginParamsType, securityAPI} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {handleAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';
import {setAppStatus} from '../../app';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RejectType} from '../TodolistsList';

export const login = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, RejectType>('auth/login', async (params, {
    dispatch,
    rejectWithValue,
}) => {

    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await authAPI.login(params);
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        }

        if (res.data.resultCode === ResultCode.Captcha) {
            dispatch(getCaptcha());
        }

        return handleAppError(res.data, {dispatch, rejectWithValue});
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const logout = createAsyncThunk<{ isLoggedIn: false }, void, RejectType>('auth/logout', async (_, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: false};
        } else {
            return handleAppError(res.data, {dispatch, rejectWithValue});
        }
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const getCaptcha = createAsyncThunk<{ captchaUrl: string }, void, RejectType>('auth/captcha', async (_, {
    dispatch,
    rejectWithValue,
}) => {
    try {
        const res = await securityAPI.getCaptcha();
        return {captchaUrl: res.data.url};
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, captchaUrl: ''} as InitialStateType,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.captchaUrl = '';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(getCaptcha.fulfilled, (state, action) => {
                state.captchaUrl = action.payload.captchaUrl;
            })
    }
})

export const {setIsLoggedIn} = authSlice.actions;

export const authReducer = authSlice.reducer;

export const asyncAuthActions = {login, logout};

type InitialStateType = {
    isLoggedIn: boolean
    captchaUrl: string
}
