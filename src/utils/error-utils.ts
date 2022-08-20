import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {setAppErrorMessage, setAppStatus} from '../app';
import {AxiosError} from 'axios';

type ThunkAPIType = {
    dispatch: Dispatch
    rejectWithValue: Function
}

export const handleAppError = <T>(data: ResponseType<T>, {dispatch, rejectWithValue}: ThunkAPIType) => {
    dispatch(setAppErrorMessage({error: data.messages[0] ? data.messages[0] : 'Some error occurred'}));
    return rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors});
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorMessage({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}