import {TaskPriority, TaskStatus, TaskType, todolistAPI, UpdateTaskType} from '../../api/todolist-api';
import {RootStateType} from '../../app/store';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from '../../app';
import {AxiosError} from 'axios';
import {handleAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {changeTodoListEntityStatus, todoListsActions} from '.';
import {RejectType} from './todolists-reducer';

export const fetchTasks = createAsyncThunk<FetchTasksType, string, RejectType>('tasks/fetchTasks', async (todoListId, {
    dispatch,
    rejectWithValue,
}) => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.getTasks(todoListId);
        return {todoListId, tasks: res.data.items};
    } catch (e) {
        return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
})

export const removeTask = createAsyncThunk<RemoveTaskType, RemoveTaskType, RejectType>('tasks/removeTask',
    async ({todoListId, taskId}, {dispatch, rejectWithValue}) => {

        dispatch(setAppStatus({status: 'loading'}));

        try {
            const res = await todolistAPI.deleteTask(todoListId, taskId);
            if (res.data.resultCode === ResultCode.Success) {
                return {todoListId, taskId};
            } else {
                return handleAppError(res.data, {dispatch, rejectWithValue});
            }
        } catch (e) {
            return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
        } finally {
            dispatch(setAppStatus({status: 'idle'}));
        }
    })

export const addTask = createAsyncThunk<TaskType, AddTaskType, RejectType>('tasks/addTask',
    async ({todoListId, title}, {dispatch, rejectWithValue}) => {

        dispatch(changeTodoListEntityStatus({todoListId, status: 'loading'}));

        try {
            const res = await todolistAPI.createTask(todoListId, title);
            if (res.data.resultCode === ResultCode.Success) {
                return res.data.data.item;
            } else {
                return handleAppError(res.data, {dispatch, rejectWithValue});
            }
        } catch (e) {
            return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
        } finally {
            dispatch(changeTodoListEntityStatus({todoListId, status: 'idle'}));
        }
    })

export const updateTask = createAsyncThunk<UpdateTaskParams, UpdateTaskParams, RejectType>('tasks/updateTaskTitle',
    async (params, {
        dispatch,
        rejectWithValue,
        getState,
    }) => {
        dispatch(changeTaskEntityStatus({todoListId: params.todoListId, taskId: params.taskId, status: 'loading'}));

        const task = (getState() as RootStateType).tasks[params.todoListId].find(task => task.id === params.taskId);

        if (!task) {
            dispatch(setAppErrorMessage({error: 'Task not found in the state'}));
            return;
        }

        const model: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...params.task
        };

        try {
            const res = await todolistAPI.updateTask(params.todoListId, params.taskId, model);
            if (res.data.resultCode === ResultCode.Success) {
                return params;
            } else {
                return handleAppError(res.data, {dispatch, rejectWithValue});
            }
        } catch (e) {
            return handleAsyncServerNetworkError((e as AxiosError), {dispatch, rejectWithValue});
        } finally {
            dispatch(changeTaskEntityStatus({todoListId: params.todoListId, taskId: params.taskId, status: 'idle'}));
        }
    })

export const tasksSlice = createSlice({
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
            .addCase(todoListsActions.addTodoList.fulfilled, (state, action) => {
                state[action.payload.id] = [];
            })
            .addCase(todoListsActions.removeTodoList.fulfilled, (state, action) => {
                delete state[action.payload];
            })
            .addCase(todoListsActions.fetchTodoLists.fulfilled, (state, action) => {
                action.payload.forEach(todo => state[todo.id] = []);
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}));
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
                state[action.payload.todoListId].splice(index, 1);
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift({...action.payload, entityStatus: 'idle'});
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
                state[action.payload.todoListId][index] = {...state[action.payload.todoListId][index], ...action.payload.task};
            })
    },
})

export const {changeTaskEntityStatus} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

export const asyncTasksActions = {fetchTasks, removeTask, addTask, updateTask};

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

type FetchTasksType = {
    todoListId: string
    tasks: TaskType[]
}

type RemoveTaskType = {
    todoListId: string
    taskId: string
}

type AddTaskType = {
    todoListId: string
    title: string
}

type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}

type UpdateTaskParams = {
    todoListId: string
    taskId: string
    task: UpdateDomainTaskType
}