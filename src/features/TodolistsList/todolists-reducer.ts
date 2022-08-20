import {FieldErrorsType, todolistAPI, TodoListType, ValueFilterType} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppStatus} from '../../app';
import {handleAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

const fetchTodoLists = createAsyncThunk<TodoListType[], void, RejectType>('todoLists/fetchTodoLists', async (_, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.getTodolists();
        return res.data;
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

const addTodoList = createAsyncThunk<TodoListType, string, RejectType>('todoLists/addTodoList', async (title, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.createTodolist(title);
        if (res.data.resultCode === ResultCode.Success) {
            return res.data.data.item;
        } else {
            return handleAppError(res.data, {dispatch, rejectWithValue});
        }
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

const removeTodoList = createAsyncThunk<string, string, RejectType>('todoLists/removeTodoList', async (todoListId, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(setAppStatus({status: 'loading'}));
    dispatch(changeTodoListEntityStatus({todoListId, status: 'loading'}));

    try {
        const res = await todolistAPI.deleteTodolist(todoListId);
        if (res.data.resultCode === ResultCode.Success) {
            return todoListId;
        } else {
            return handleAppError(res.data, {dispatch, rejectWithValue});
        }
    } catch (e) {
        dispatch(changeTodoListEntityStatus({todoListId, status: 'idle'}));
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

const changeTodoListTitle = createAsyncThunk<ChangeTodoListTitleType, ChangeTodoListTitleType,
    RejectType>('todoLists/changeTodoListTitle', async (params, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(changeTodoListEntityStatus({todoListId: params.todoListId, status: 'loading'}));

    try {
        const res = await todolistAPI.updateTodolistTitle(params.todoListId, params.title);
        if (res.data.resultCode === ResultCode.Success) {
            return {todoListId: params.todoListId, title: params.title};
        } else {
            return handleAppError(res.data, {dispatch, rejectWithValue});
        }
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(changeTodoListEntityStatus({todoListId: params.todoListId, status: 'idle'}));
    }
})

export const todoListsReducerSlice = createSlice({
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
                return action.payload.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}));
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'});
            })
            .addCase(removeTodoList.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload);
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

export const asyncTodoActions = {fetchTodoLists, addTodoList, removeTodoList, changeTodoListTitle};

export type TodoListsDomainType = TodoListType & {
    filter: ValueFilterType
    entityStatus: RequestStatusType
}

export type RejectType = {
    rejectValue: {
        errors: string[]
        fieldsErrors?: FieldErrorsType[]
    }
}

type ChangeTodoListTitleType = {
    todoListId: string
    title: string
}


