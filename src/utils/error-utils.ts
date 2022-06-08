import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';
import {AppActionsType, setErrorMessage, setStatus} from '../store/reducers/app-reducer';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorMessage(data.messages[0]));
    } else {
        dispatch(setErrorMessage('Some error occurred'));
    }

    dispatch(setStatus('failed'));
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorMessage(error.message));
    dispatch(setStatus('failed'));
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>;