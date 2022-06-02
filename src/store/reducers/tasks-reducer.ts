import {v1} from 'uuid';
import {addTodoListAC, removeTodoListAC, setTodoLists} from './todolists-reducer';
import {ResponseCode, TaskPriority, TaskStatus, TaskType, todolistAPI, UpdateTaskType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {RootStateType} from '../../app/store';

export const tasksReducer = (state: TasksStateType = {}, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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
            return {[action.payload.todoListId]: [], ...state};
        case 'REMOVE-TODOLIST':
            delete state[action.payload.todoListId];
            return {...state};
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.payload.todoLists.forEach(todo => stateCopy[todo.id] = []);
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.payload.todoListId]: action.payload.tasks};
        default:
            return state;
    }
};

// ------- actions
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

// ------- thunks
export const fetchTasks = (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoListId).then(res => {
        dispatch(setTasks(todoListId, res.data.items));
    })
};

export const removeTask = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todoListId, taskId).then(res => {
        dispatch(removeTaskAC(todoListId, taskId));
    })
};

export const addTask = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todoListId, title).then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
            dispatch(addTaskAC(res.data.data.item))
        }
    })
};

export const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatus) =>
    (dispatch: Dispatch, getState: () => RootStateType) => {

        const task = getState().tasks[todolistId].find(task => task.id === taskId);

        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                description: task.description,
                status: status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }).then(res => {
                if (res.data.resultCode === ResponseCode.Success) {
                    dispatch(changeStatusAC(todolistId, taskId, status));
                }
            })
        }
    };

export const updateTaskTitle = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => RootStateType) => {

        const task = getState().tasks[todolistId].find(task => task.id === taskId);

        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }).then(res => {
                if (res.data.resultCode === ResponseCode.Success) {
                    dispatch(changeValueTaskAC(todolistId, taskId, title));
                }
            })
        }
    };

// ------- types
export type TasksStateType = {
    [key: string]: TaskType[]
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