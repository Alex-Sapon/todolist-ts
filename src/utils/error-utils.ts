import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {setAppErrorMessage} from '../store/reducers/app-reducer';

export const handleAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessage({error: data.messages[0]}));
    } else {
        dispatch(setAppErrorMessage({error: 'Some error occurred'}));
    }
}