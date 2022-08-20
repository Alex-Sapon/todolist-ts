import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {setAppErrorMessage} from '../app';

type ThunkApiType = {
    dispatch: Dispatch
    rejectWithValue: Function
}

export const handleAppError = <T>(data: ResponseType<T>, {dispatch, rejectWithValue}: ThunkApiType) => {
    dispatch(setAppErrorMessage({error: data.messages[0] ? data.messages[0] : 'Some error occurred'}));
    return rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors});
}