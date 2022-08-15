import {addTodoList, changeTodoListEntityStatus, fetchTodoLists, removeTodoList} from './todolists-reducer';
import {TaskStatus, TaskType, todolistAPI, UpdateTaskType} from '../../api/todolist-api';
import {RootStateType} from '../store';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from './app-reducer';
import {AxiosError} from 'axios';
import {handleAppError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.getTasks(todoListId);
        return {todoListId, tasks: res.data.items};
    } catch (e) {
        const err = e as AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
        return rejectWithValue(err.message);
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const removeTask = createAsyncThunk('tasks/removeTask',
    async ({todoListId, taskId}: { todoListId: string, taskId: string }, thunkAPI) => {

        thunkAPI.dispatch(setAppStatus({status: 'loading'}));

        try {
            const res = await todolistAPI.deleteTask(todoListId, taskId);
            if (res.data.resultCode === ResultCode.Success) {
                return {todoListId, taskId};
            } else {
                handleAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue(res.data.messages[0]);
            }
        } catch (e) {
            const err = e as AxiosError;
            thunkAPI.dispatch(setAppErrorMessage({error: err.message}));
            return thunkAPI.rejectWithValue(err.message);
        } finally {
            thunkAPI.dispatch(setAppStatus({status: 'idle'}));
        }
    })

export const addTask = createAsyncThunk('tasks/addTask',
    async ({todoListId, title}: { todoListId: string, title: string }, thunkAPI) => {

        thunkAPI.dispatch(changeTodoListEntityStatus({todoListId, status: 'loading'}));

        try {
            const res = await todolistAPI.createTask(todoListId, title);
            if (res.data.resultCode === ResultCode.Success) {
                return {task: res.data.data.item};
            } else {
                handleAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue(res.data.messages[0]);
            }
        } catch (e) {
            const err = e as AxiosError;
            thunkAPI.dispatch(setAppErrorMessage({error: err.message}));
            return thunkAPI.rejectWithValue(err.message);
        } finally {
            thunkAPI.dispatch(changeTodoListEntityStatus({todoListId, status: 'idle'}));
        }
    })

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus',
    async ({todoListId, taskId, status}: { todoListId: string, taskId: string, status: TaskStatus }, thunkAPI) => {

        thunkAPI.dispatch(changeTaskEntityStatus({todoListId, taskId, status: 'loading'}));

        const task = (thunkAPI.getState() as RootStateType).tasks[todoListId].find(task => task.id === taskId);

        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state')
        }

        const model: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        };

        try {
            const res = await todolistAPI.updateTask(todoListId, taskId, model);
            if (res.data.resultCode === ResultCode.Success) {
                return {todoListId, taskId, status: status};
            } else {
                handleAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue(res.data.messages[0]);
            }
        } catch (e) {
            const err = e as AxiosError;
            thunkAPI.dispatch(setAppErrorMessage({error: err.message}));
            return thunkAPI.rejectWithValue(err.message);
        } finally {
            thunkAPI.dispatch(changeTaskEntityStatus({todoListId, taskId, status: 'idle'}));
        }
    })

export const updateTaskTitle = createAsyncThunk('tasks/updateTaskTitle',
    async ({todoListId, taskId, title}: { todoListId: string, taskId: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(changeTaskEntityStatus({todoListId, taskId, status: 'loading'}));

        const task = (thunkAPI.getState() as RootStateType).tasks[todoListId].find(task => task.id === taskId);

        if (!task) return thunkAPI.rejectWithValue('task not found in the state');

        const model: UpdateTaskType = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        };

        try {
            const res = await todolistAPI.updateTask(todoListId, taskId, model);
            if (res.data.resultCode === ResultCode.Success) {
                return {todoListId, taskId, title: title};
            } else {
                handleAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue(res.data.messages[0]);
            }
        } catch (e) {
            const err = e as AxiosError;
            thunkAPI.dispatch(setAppErrorMessage({error: err.message}));
            return thunkAPI.rejectWithValue(err.message);
        } finally {
            thunkAPI.dispatch(changeTaskEntityStatus({todoListId, taskId, status: 'idle'}));
        }
    })

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskEntityStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, status: RequestStatusType }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
            state[action.payload.todoListId][index].entityStatus = action.payload.status;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addTodoList.fulfilled, (state, action) => {
                state[action.payload.todoList.id] = [];
            })
            .addCase(removeTodoList.fulfilled, (state, action) => {
                delete state[action.payload.todoListId];
            })
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                action.payload.todoLists.forEach(todo => state[todo.id] = []);
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}));
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
                state[action.payload.todoListId].splice(index, 1);
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'});
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
                state[action.payload.todoListId][index].status = action.payload.status;
            })
            .addCase(updateTaskTitle.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
                state[action.payload.todoListId][index].title = action.payload.title;
            })
    }
})

export const {changeTaskEntityStatus} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}