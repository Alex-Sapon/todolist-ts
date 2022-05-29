import {v1} from 'uuid';
import {addTodoListAC, removeTodoListAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../../api/todolist-api';

export const tasksReducer = (state: TasksStateType = {}, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state,
                [action.payload.todoListId]: [{
                    id: v1(),
                    title: action.payload.title,
                    description: '',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: action.payload.todoListId,
                    order: 0,
                    addedDate: '',
                }, ...state[action.payload.todoListId]]};
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
        default:
            return state;
    }
};

// actions
export const addTaskAC = (todoListId: string, title: string) => ({
    type: 'ADD-TASK',
    payload: {
        todoListId,
        title,
    }
} as const);
export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        todoListId,
        taskId,
    }
} as const);
export const changeStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => ({
    type: 'CHANGE-STATUS',
    payload: {
        todoListId,
        taskId,
        status,
    }
} as const);
export const changeValueTaskAC = (todoListId: string, taskId: string, title: string) => ({
    type: 'CHANGE-VALUE-TASK',
    payload: {
        todoListId,
        taskId,
        title,
    }
} as const);

// thunks

// types
export type TasksStateType = {
    [key: string]: TaskType[]
}
type ActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeValueTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>