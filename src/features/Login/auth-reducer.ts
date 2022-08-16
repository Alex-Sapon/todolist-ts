import {AxiosError} from 'axios';
import {authAPI, FieldErrorsType, LoginParamsType} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {handleAppError} from '../../utils/error-utils';
import {setAppErrorMessage, setAppStatus} from '../../app/app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const login = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType,
    { rejectValue: { errors: string[], fieldsErrors?: FieldErrorsType[] } }>('auth/login', async (params, {
    dispatch,
    rejectWithValue
}) => {

    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await authAPI.login(params);
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
        }
    } catch (e) {
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({errors: [err.message]});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: false};
        } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
        }
    } catch (e) {
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({errors: [err.message]});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
    }
})

export const {setIsLoggedIn} = authSlice.actions;

export const authReducer = authSlice.reducer;