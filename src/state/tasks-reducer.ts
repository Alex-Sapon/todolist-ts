import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodoListAC, removeTodoListAC} from './todolists-reducer';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch(action.type) {
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(i => i.id !== action.id)}
        case 'CHANGE-STATUS':
            return {...state, [action.todoListId]: state[action.todoListId].map(i => i.id === action.id ? {...i, isDone: action.isDone} : i)}
        case 'CHANGE-VALUE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].map(i => i.id === action.id ? {...i, title: action.title} : i)}
        case 'ADD-TODOLIST':
            return {[action.id]: [], ...state}
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return {...state}
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof addTaskAC> 
| ReturnType<typeof removeTaskAC> 
| ReturnType<typeof changeStatusAC> 
| ReturnType<typeof changeValueTaskAC>
| ReturnType<typeof addTodoListAC>
| ReturnType<typeof removeTodoListAC>

export const addTaskAC = (todoListId: string, title: string) => ({type: 'ADD-TASK', todoListId, title} as const)
export const removeTaskAC = (todoListId: string, id: string) => ({type: 'REMOVE-TASK', todoListId, id} as const)
export const changeStatusAC = (todoListId: string, isDone: boolean, id: string) => ({type: 'CHANGE-STATUS', todoListId, isDone, id} as const)
export const changeValueTaskAC = (todoListId: string, title: string, id: string) => ({type: 'CHANGE-VALUE-TASK', todoListId, title, id} as const)