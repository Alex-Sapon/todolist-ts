import {todolistAPI, TodoListType, ValueFilterType} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from './app-reducer';
import {handleAppError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppThunk} from '../store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TodoListsDomainType[] = []

const todoListsReducerSlice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId);
            state.splice(index, 1);
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'});
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId);
            state[index].title = action.payload.title;
        },
        changeTodoListFilterAC(state, action: PayloadAction<{ todoListId: string, filter: ValueFilterType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId);
            state[index].filter = action.payload.filter;
        },
        setTodoLists(state, action: PayloadAction<{ todoLists: TodoListType[] }>) {
            return action.payload.todoLists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}));
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId);
            state[index].entityStatus = action.payload.status;
        },
    },
})

export const {
    removeTodoListAC,
    setTodoLists,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    changeTodoListEntityStatus,
} = todoListsReducerSlice.actions;

export const todoListsReducer = todoListsReducerSlice.reducer;

export const fetchTodoLists = (): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'));

    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodoLists({todoLists: res.data}));
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
};

export const addTodoList = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'));

    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(addTodoListAC({todoList: res.data.data.item}));
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

export const removeTodoList = (todoListId: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'));
    dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'loading'}));

    todolistAPI.deleteTodolist(todoListId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(removeTodoListAC({todoListId: todoListId}));
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

export const changeTodoListTitle = (todoListId: string, title: string): AppThunk => dispatch => {
    dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'loading'}));

    todolistAPI.updateTodolistTitle(todoListId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(changeTodoListTitleAC({todoListId: todoListId, title: title}));
            }

            if (res.data.resultCode === ResultCode.Error) {
                handleAppError(res.data, dispatch);
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'idle'}));
        })
};

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
