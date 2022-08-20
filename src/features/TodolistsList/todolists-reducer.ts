import {FieldErrorsType, todolistAPI, TodoListType, ValueFilterType} from '../../api/todolist-api';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from '../../app';
import {handleAppError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

const fetchTodoLists = createAsyncThunk('todoLists/fetchTodoLists', async (_, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.getTodolists();
        return {todoLists: res.data};
    } catch (e) {
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({error: err.message});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

const addTodoList = createAsyncThunk<TodoListType, string, RejectType>('todoLists/addTodoList', async (title, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.createTodolist(title);
        if (res.data.resultCode === ResultCode.Success) {
            return res.data.data.item;
        } else {
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
        }
    } catch (e) {
        return rejectWithValue({errors: [(e as AxiosError).message]});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

const removeTodoList = createAsyncThunk('todoLists/removeTodoList', async (todoListId: string, {
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
            return handleAppError(res.data, {dispatch, rejectWithValue});
        }
    } catch (e) {
        dispatch(changeTodoListEntityStatus({todoListId, status: 'idle'}));
        return dispatch(setAppErrorMessage({error: (e as AxiosError).message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

const changeTodoListTitle = createAsyncThunk('todoLists/changeTodoListTitle', async (params: { todoListId: string, title: string }, {
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
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue({error: err.message});
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
                return action.payload.todoLists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}));
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'});
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

