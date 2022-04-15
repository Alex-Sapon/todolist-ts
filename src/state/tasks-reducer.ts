import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type AddTaskType = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}
export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todoListId: string
    id: string
}
export type ChangeStatusType = {
    type: 'CHANGE-STATUS'
    todoListId: string
    isDone: boolean
    id: string
}
export type ChangeValueTaskType = {
    type: 'CHANGE-VALUE-TASK'
    todoListId: string
    title: string
    id: string
}
type ActionType = AddTaskType | RemoveTaskType | ChangeStatusType | ChangeValueTaskType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch(action.type) {
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]}
        case 'REMOVE-TASK':
            return state
        case 'CHANGE-STATUS':
            return state
        case 'CHANGE-VALUE-TASK':
            return state
        default:
            return state
    }
}

export const addTaskAC = (todoListId: string, title: string) => ({type: 'ADD-TASK', todoListId, title} as const)
export const removeTaskAC = (todoListId: string, id: string) => ({type: 'REMOVE-TASK', todoListId, id} as const)
export const changeStatusAC = (todoListId: string, isDone: boolean, id: string) => ({type: 'CHANGE-STATUS', todoListId, isDone, id} as const)
export const changeValueTaskAC = (todoListId: string, title: string, id: string) => ({type: 'CHANGE-VALUE-TASK', todoListId, title, id} as const)