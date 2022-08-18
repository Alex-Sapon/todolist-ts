import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {setAppErrorMessage} from '../app';

export const handleAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    dispatch(setAppErrorMessage({error: data.messages[0] ? data.messages[0] : 'Some error occurred'}));
}