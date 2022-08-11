import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {AppActionsType, setAppErrorMessage, setAppStatus} from '../store/reducers/app-reducer';

// generic function
export const handleAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessage({error: data.messages[0]}));
    } else {
        dispatch(setAppErrorMessage({error: 'Some error occurred'}));
    }
}

export const handleNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorMessage({error: error.message}));
    dispatch(setAppStatus({status: 'failed'}));
}