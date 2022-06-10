import {todolistAPI, TodoListType, ValueFilterType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from './app-reducer';
import { handleAppError } from '../../utils/error-utils';
import { AxiosError } from 'axios';

export const todoListsReducer = (state: TodoListsDomainType[] = [], action: TodoListActionsType): TodoListsDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todoListId);
        case 'ADD-TODOLIST':
            return [{...action.payload.todoList, filter: 'all', entityStatus: 'idle'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.payload.todoListId
                ? {...todo, title: action.payload.title} : todo);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.payload.todoListId
                ? {...todo, filter: action.payload.filter} : todo);
        case 'SET-TODOLISTS':
            return action.payload.todoLists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}));
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(todo => todo.id === action.payload.todoListId 
                ? {...todo, entityStatus: action.payload.status} : todo);
        default:
            return state;
    }
}

// ------- actions -------
export const removeTodoListAC = (todoListId: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        todoListId,
    },
} as const);

export const addTodoListAC = (todoList: TodoListType) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todoList,
    },
} as const);

export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todoListId,
        title,
    },
} as const);

export const changeTodoListFilterAC = (todoListId: string, filter: ValueFilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todoListId,
        filter,
    },
} as const);

export const setTodoLists = (todoLists: TodoListType[]) => ({
    type: 'SET-TODOLISTS',
    payload: {
        todoLists,
    },
} as const);

export const changeTodoListEntityStatus = (todoListId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    payload: {
        todoListId,
        status,
    }
} as const);

// ------- thunks -------
export const fetchTodoLists = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));
    
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodoLists(res.data));
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
};

export const addTodoList = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));

    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(addTodoListAC(res.data.data.item));
            }

            if (res.data.resultCode === ResultCode.Error) {
                handleAppError(res.data, dispatch);
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
};

export const removeTodoList = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));
    dispatch(changeTodoListEntityStatus(todoListId, 'loading'));

    todolistAPI.deleteTodolist(todoListId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(removeTodoListAC(todoListId));
            }

            if (res.data.resultCode === ResultCode.Error) {
                handleAppError(res.data, dispatch);
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
};

export const changeTodoListTitle = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));

    todolistAPI.updateTodolistTitle(todoListId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(changeTodoListTitleAC(todoListId, title));
            }

            if (res.data.resultCode === ResultCode.Error) {
                handleAppError(res.data, dispatch);
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
};

// ------- types -------
export type TodoListsDomainType = TodoListType & {
    filter: ValueFilterType
    entityStatus: RequestStatusType
}
export type TodoListActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof changeTodoListEntityStatus>
