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
        deleteTodolist(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId);
            if (index > -1) state.splice(index, 1);
        },
        setTodoList(state, action: PayloadAction<{ todoList: TodoListType }>) {
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
    deleteTodolist,
    setTodoLists,
    setTodoList,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    changeTodoListEntityStatus,
} = todoListsReducerSlice.actions;

export const todoListsReducer = todoListsReducerSlice.reducer;

export const fetchTodoLists = (): AppThunk => async dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.getTodolists();
        dispatch(setTodoLists({todoLists: res.data}));
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
};

export const addTodoList = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.createTodolist(title);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setTodoList({todoList: res.data.data.item}));
        }

        if (res.data.resultCode === ResultCode.Error) {
            handleAppError(res.data, dispatch);
        }
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
};

export const removeTodoList = (todoListId: string): AppThunk => async dispatch => {
    dispatch(setAppStatus({status: 'loading'}));
    dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'loading'}));

    try {
        const res = await todolistAPI.deleteTodolist(todoListId);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(deleteTodolist({todoListId: todoListId}));
        }

        if (res.data.resultCode === ResultCode.Error) {
            handleAppError(res.data, dispatch);
        }
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
};

export const changeTodoListTitle = (todoListId: string, title: string): AppThunk => async dispatch => {
    dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'loading'}));

    try {
        const res = await todolistAPI.updateTodolistTitle(todoListId, title);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeTodoListTitleAC({todoListId: todoListId, title: title}));
        }

        if (res.data.resultCode === ResultCode.Error) {
            handleAppError(res.data, dispatch);
        }
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
    } finally {
        dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'idle'}));
    }
};

export type TodoListsDomainType = TodoListType & {
    filter: ValueFilterType
    entityStatus: RequestStatusType
}
export type TodoListActionsType =
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof setTodoList>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof changeTodoListEntityStatus>
