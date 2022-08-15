import {todolistAPI, TodoListType, ValueFilterType} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from './app-reducer';
import {handleAppError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const fetchTodoLists = createAsyncThunk('todoLists/fetchTodoLists', async (_, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.getTodolists();
        return {todoLists: res.data};
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({error: err.message});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const addTodoList = createAsyncThunk('todoLists/addTodoList', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.createTodolist(title);
        if (res.data.resultCode === ResultCode.Success) {
            return {todoList: res.data.data.item};
        } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue({error: res.data.messages[0]});
        }
    } catch (e) {
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({error: err.message});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const removeTodoList = createAsyncThunk('todoLists/removeTodoList', async (todoListId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));
    dispatch(changeTodoListEntityStatus({todoListId, status: 'loading'}));

    try {
        const res = await todolistAPI.deleteTodolist(todoListId);
        if (res.data.resultCode === ResultCode.Success) {
            return {todoListId};
        } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue({error: res.data.messages[0]});
        }
    } catch (e) {
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({error: err.message});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const changeTodoListTitle = createAsyncThunk('todoLists/changeTodoListTitle', async (params: { todoListId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeTodoListEntityStatus({todoListId: params.todoListId, status: 'loading'}));

    try {
        const res = await todolistAPI.updateTodolistTitle(params.todoListId, params.title);
        if (res.data.resultCode === ResultCode.Success) {
            return {todoListId: params.todoListId, title: params.title};
        } else {
            handleAppError(res.data, dispatch);
            return rejectWithValue({error: res.data.messages[0]});
        }
    } catch (e) {
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({error: err.message});
    } finally {
        dispatch(changeTodoListEntityStatus({todoListId: params.todoListId, status: 'idle'}));
    }
})

const todoListsReducerSlice = createSlice({
    name: 'todoLists',
    initialState: [] as TodoListsDomainType[],
    reducers: {
        changeTodoListFilter(state, action: PayloadAction<{ todoListId: string, filter: ValueFilterType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId);
            state[index].filter = action.payload.filter;
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todoListId);
            state[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                return action.payload.todoLists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}));
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'});
            })
            .addCase(removeTodoList.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todoListId);
                if (index > -1) state.splice(index, 1);
            })
            .addCase(changeTodoListTitle.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todoListId);
                state[index].title = action.payload.title;
            })
    }
})

export const {changeTodoListFilter, changeTodoListEntityStatus} = todoListsReducerSlice.actions;

export const todoListsReducer = todoListsReducerSlice.reducer;

export type TodoListsDomainType = TodoListType & {
    filter: ValueFilterType
    entityStatus: RequestStatusType
}
