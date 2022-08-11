import {addTodoListAC, changeTodoListEntityStatus, removeTodoListAC, setTodoLists} from './todolists-reducer';
import {TaskStatus, TaskType, todolistAPI, TodoListType, UpdateTaskType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
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
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'});
        },
        removeTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
            state[action.payload.todoListId].splice(index, 1);
        },
        changeStatusAC(state, action: PayloadAction<{ todoListId: string, taskId: string, status: TaskStatus }>) {
            const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
            state[action.payload.todoListId][index].status = action.payload.status;
        },
        changeValueTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string, title: string }>) {
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
       builder.addCase(addTodoListAC, (state, action) => {
           state[action.payload.todoList.id] = [];
       });
       builder.addCase(removeTodoListAC, (state, action) => {
           delete state[action.payload.todoListId];
       });
       builder.addCase(setTodoLists, (state, action) => {
           action.payload.todoLists.forEach(todo => state[todo.id] = []);
       });
    }
})

export const {
    addTaskAC,
    changeTaskEntityStatus,
    changeValueTaskAC,
    changeStatusAC,
    removeTaskAC,
    setTasks
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

export const fetchTasks = (todoListId: string): AppThunk => dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    todolistAPI.getTasks(todoListId)
        .then(res => {
            dispatch(setTasks({todoListId: todoListId, tasks: res.data.items}));
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage({error: err.message}));
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'idle'}));
        })
};

export const removeTask = (todoListId: string, taskId: string): AppThunk => dispatch => {
    dispatch(setAppStatus({status: 'loading'}));

    todolistAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(removeTaskAC({todoListId: todoListId, taskId: taskId}));
            }

            if (res.data.resultCode === ResultCode.Error) {
                handleAppError(res.data, dispatch);
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage({error: err.message}));
        })
        .finally(() => {
            dispatch(setAppStatus({status: 'idle'}));
        })
};

export const addTask = (todoListId: string, title: string): AppThunk => dispatch => {
    dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'loading'}));

    todolistAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(addTaskAC({task: res.data.data.item}));
            }

            if (res.data.resultCode === ResultCode.Error) {
                handleAppError(res.data, dispatch);
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage({error: err.message}));
        })
        .finally(() => {
            dispatch(changeTodoListEntityStatus({todoListId: todoListId, status: 'idle'}));
        })
};

export const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatus): AppThunk =>
    (dispatch: Dispatch, getState: () => RootStateType) => {
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

            todolistAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(changeStatusAC({todoListId: todolistId, taskId: taskId, status: status}));
                    }

                    if (res.data.resultCode === ResultCode.Error) {
                        handleAppError(res.data, dispatch);
                    }
                })
                .catch((err: AxiosError) => {
                    dispatch(setAppErrorMessage({error: err.message}));
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatus({todoListId: todolistId, taskId: taskId, status: 'idle'}));
                })
        }
    };

export const updateTaskTitle = (todolistId: string, taskId: string, title: string): AppThunk =>
    (dispatch: Dispatch, getState: () => RootStateType) => {
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

            todolistAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(changeValueTaskAC({todoListId: todolistId, taskId: taskId, title: title}));
                    }

                    if (res.data.resultCode === ResultCode.Error) {
                        handleAppError(res.data, dispatch);
                    }
                })
                .catch((error) => {
                    dispatch(setAppErrorMessage(error.message));
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatus({todoListId: todolistId, taskId: taskId, status: 'idle'}));
                })
        }
    };

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TasksActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeValueTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeTaskEntityStatus>