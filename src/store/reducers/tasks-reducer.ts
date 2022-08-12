import {changeTodoListEntityStatus, deleteTodolist, setTodoList, setTodoLists} from './todolists-reducer';
import {TaskStatus, TaskType, todolistAPI, UpdateTaskType} from '../../api/todolist-api';
import {AppThunk, RootStateType} from '../store';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from './app-reducer';
import {AxiosError} from 'axios';
import {handleAppError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'});
        },
        deleteTask(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
            state[action.payload.todoListId].splice(index, 1);
        },
        changeStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, status: TaskStatus }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
            state[action.payload.todoListId][index].status = action.payload.status;
        },
        changeValueTask(state, action: PayloadAction<{ todoListId: string, taskId: string, title: string }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
            state[action.payload.todoListId][index].title = action.payload.title;
        },
        setTasks(state, action: PayloadAction<{ todoListId: string, tasks: TaskType[] }>) {
            state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}));
        },
        changeTaskEntityStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, status: RequestStatusType }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
            state[action.payload.todoListId][index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodoList, (state, action) => {
            state[action.payload.todoList.id] = [];
        });
        builder.addCase(deleteTodolist, (state, action) => {
            delete state[action.payload.todoListId];
        });
        builder.addCase(setTodoLists, (state, action) => {
            action.payload.todoLists.forEach(todo => state[todo.id] = []);
        });
    }
})

export const {
    setTask,
    changeTaskEntityStatus,
    changeValueTask,
    changeStatus,
    deleteTask,
    setTasks
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

export const fetchTasks = (todoListId: string): AppThunk => async dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.getTasks(todoListId);
        dispatch(setTasks({todoListId: todoListId, tasks: res.data.items}));
    } catch (e) {
        const err = e as Error | AxiosError;
        dispatch(setAppErrorMessage({error: err.message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }
};

export const removeTask = (todoListId: string, taskId: string): AppThunk => async dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await todolistAPI.deleteTask(todoListId, taskId);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(deleteTask({todoListId: todoListId, taskId: taskId}));
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

export const addTask = (todoListId: string, title: string): AppThunk => async dispatch => {
    dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'loading'}));

    try {
        const res = await todolistAPI.createTask(todoListId, title);
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setTask({task: res.data.data.item}));
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

export const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatus): AppThunk =>
    async (dispatch, getState: () => RootStateType) => {
        dispatch(changeTaskEntityStatus({todoListId: todolistId, taskId: taskId, status: 'loading'}));

        const task = getState().tasks[todolistId].find(task => task.id === taskId);

        if (task) {
            const model: UpdateTaskType = {
                title: task.title,
                description: task.description,
                status: status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            };

            try {
                const res = await todolistAPI.updateTask(todolistId, taskId, model);
                if (res.data.resultCode === ResultCode.Success) {
                    dispatch(changeStatus({todoListId: todolistId, taskId: taskId, status: status}));
                }

                if (res.data.resultCode === ResultCode.Error) {
                    handleAppError(res.data, dispatch);
                }
            } catch (e) {
                const err = e as Error | AxiosError;
                dispatch(setAppErrorMessage({error: err.message}));
            } finally {
                dispatch(changeTaskEntityStatus({todoListId: todolistId, taskId: taskId, status: 'idle'}));
            }
        }
    };

export const updateTaskTitle = (todolistId: string, taskId: string, title: string): AppThunk =>
    async (dispatch, getState: () => RootStateType) => {
        dispatch(changeTaskEntityStatus({todoListId: todolistId, taskId: taskId, status: 'loading'}));

        const task = getState().tasks[todolistId].find(task => task.id === taskId);

        if (task) {
            const model: UpdateTaskType = {
                title: title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            };

            try {
                const res = await todolistAPI.updateTask(todolistId, taskId, model);
                if (res.data.resultCode === ResultCode.Success) {
                    dispatch(changeValueTask({todoListId: todolistId, taskId: taskId, title: title}));
                }

                if (res.data.resultCode === ResultCode.Error) {
                    handleAppError(res.data, dispatch);
                }
            } catch (e) {
                const err = e as Error | AxiosError;
                dispatch(setAppErrorMessage({error: err.message}));
            } finally {
                dispatch(changeTaskEntityStatus({todoListId: todolistId, taskId: taskId, status: 'idle'}));
            }
        }
    };

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TasksActionsType =
    | ReturnType<typeof setTask>
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof changeStatus>
    | ReturnType<typeof changeValueTask>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeTaskEntityStatus>