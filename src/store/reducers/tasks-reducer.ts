import {addTodoListAC, removeTodoListAC, setTodoLists} from './todolists-reducer';
import {TaskStatus, TaskType, todolistAPI, UpdateTaskType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {RootStateType} from '../store';
import {ResultCode} from '../../enums/result-code';
import {RequestStatusType, setAppErrorMessage, setAppStatus} from './app-reducer';
import {AxiosError} from 'axios';
import {handleAppError} from '../../utils/error-utils';

export const tasksReducer = (state: TasksStateType = {}, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [{
                    ...action.payload.task,
                    entityStatus: 'idle'
                }, ...state[action.payload.task.todoListId]]
            };
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .filter(task => task.id !== action.payload.taskId)
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(task => task.id === action.payload.taskId ? {...task, status: action.payload.status} : task)
            };
        case 'CHANGE-VALUE-TASK':
            return {
                ...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
            };
        case 'ADD-TODOLIST':
            return {[action.payload.todoList.id]: [], ...state};
        case 'REMOVE-TODOLIST':
            delete state[action.payload.todoListId];
            return {...state};
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.payload.todoLists.forEach(todo => stateCopy[todo.id] = []);
            return stateCopy;
        }
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todoListId]: action.payload.tasks.map(task => ({...task, entityStatus: 'idle'}))
            };
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId
                    ? {...task, entityStatus: action.payload.status} : task)
            }
        default:
            return state;
    }
};

// ------- actions -------
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    payload: {
        task,
    },
} as const);

export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        todoListId,
        taskId,
    },
} as const);

export const changeStatusAC = (todoListId: string, taskId: string, status: TaskStatus) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todoListId,
        taskId,
        status,
    },
} as const);

export const changeValueTaskAC = (todoListId: string, taskId: string, title: string) => ({
    type: 'CHANGE-VALUE-TASK',
    payload: {
        todoListId,
        taskId,
        title,
    },
} as const);

export const setTasks = (todoListId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    payload: {
        todoListId,
        tasks,
    },
} as const);

export const changeTaskEntityStatus = (todoListId: string, taskId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    payload: {
        todoListId,
        taskId,
        status,
    }
} as const);


// ------- thunks -------
export const fetchTasks = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));

    todolistAPI.getTasks(todoListId)
        .then(res => {
            dispatch(setTasks(todoListId, res.data.items));
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorMessage(err.message));
        })
        .finally(() => {
            dispatch(setAppStatus('idle'));
        })
};

export const removeTask = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));

    todolistAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(removeTaskAC(todoListId, taskId));
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

export const addTask = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));

    todolistAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(addTaskAC(res.data.data.item));
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

export const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatus) =>
    (dispatch: Dispatch, getState: () => RootStateType) => {
        dispatch(changeTaskEntityStatus(todolistId, taskId, 'loading'));

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
                        dispatch(changeStatusAC(todolistId, taskId, status));
                    }

                    if (res.data.resultCode === ResultCode.Error) {
                        handleAppError(res.data, dispatch);
                    }
                })
                .catch((err: AxiosError) => {
                    dispatch(setAppErrorMessage(err.message));
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatus(todolistId, taskId, 'idle'));
                })
        }
    };

export const updateTaskTitle = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => RootStateType) => {
        dispatch(setAppStatus('loading'));
        dispatch(changeTaskEntityStatus(todolistId, taskId, 'loading'));

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
                        dispatch(changeValueTaskAC(todolistId, taskId, title));
                    }

                    if (res.data.resultCode === ResultCode.Error) {
                        handleAppError(res.data, dispatch);
                    }
                })
                .catch((error) => {
                    dispatch(setAppErrorMessage(error.message));
                })
                .finally(() => {
                    dispatch(setAppStatus('idle'));
                    dispatch(changeTaskEntityStatus(todolistId, taskId, 'idle'));
                })
        }
    };


// ------- types -------
export type TaskDomainStateType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: TaskDomainStateType[]
}

export type TasksActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeValueTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeTaskEntityStatus>