import {TasksStateType} from '../App';
import {v1} from 'uuid';

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch(action.type) {
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(i => i.id !== action.id)}
        case 'CHANGE-STATUS':
            return {...state, [action.todoListId]: state[action.todoListId].map(i => i.id === action.id ? {...i, isDone: action.isDone} : i)}
        case 'CHANGE-VALUE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].map(i => i.id === action.id ? {...i, title: action.title} : i)}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof addTaskAC> 
| ReturnType<typeof removeTaskAC> 
| ReturnType<typeof changeStatusAC> 
| ReturnType<typeof changeValueTaskAC>

export const addTaskAC = (todoListId: string, title: string) => ({type: 'ADD-TASK', todoListId, title} as const)
export const removeTaskAC = (todoListId: string, id: string) => ({type: 'REMOVE-TASK', todoListId, id} as const)
export const changeStatusAC = (todoListId: string, isDone: boolean, id: string) => ({type: 'CHANGE-STATUS', todoListId, isDone, id} as const)
export const changeValueTaskAC = (todoListId: string, title: string, id: string) => ({type: 'CHANGE-VALUE-TASK', todoListId, title, id} as const)