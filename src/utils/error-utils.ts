import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {AppActionsType, setAppErrorMessage, setAppStatus} from '../store/reducers/app-reducer';

// generic function
export const handleAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessage(data.messages[0]));
    } else {
        dispatch(setAppErrorMessage('Some error occurred'));
    }
}

export const handleNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorMessage(error.message));
    dispatch(setAppStatus('failed'));
}