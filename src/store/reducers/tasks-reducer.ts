import {v1} from 'uuid';
import {addTodoListAC, removeTodoListAC, setTodoLists} from './todolists-reducer';
import {TaskPriority, TaskStatus, TaskType, todolistAPI} from '../../api/todolist-api';
import {Dispatch} from 'redux';

export const tasksReducer = (state: TasksStateType = {}, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todoListId]: [{
                    id: v1(),
                    title: action.payload.title,
                    description: '',
                    status: TaskStatus.New,
                    priority: TaskPriority.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: action.payload.todoListId,
                    order: 0,
                    addedDate: '',
                }, ...state[action.payload.todoListId]]
            };
        case 'REMOVE-TASK':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .filter(task => task.id !== action.payload.taskId)};
        case 'CHANGE-STATUS':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(task => task.id === action.payload.taskId ? {...task, status: action.payload.status} : task)};
        case 'CHANGE-VALUE-TASK':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)};
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

export const addTaskAC = (todoListId: string, title: string) => ({
    type: 'ADD-TASK',
    payload: {
        todoListId,
        title,
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
    type: 'CHANGE-STATUS',
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

// thunks
export const fetchTasks = (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoListId).then(res => {
        dispatch(setTasks(todoListId, res.data.items));
    })
};

export const removeTask = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todoListId, taskId).then(res => {
        dispatch(removeTaskAC(todoListId, taskId));
    })
}

// types
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