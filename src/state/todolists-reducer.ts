import { v1 } from 'uuid'
import {TodoListsType, ValueFilterType} from '../App'

const initialState: Array<TodoListsType> = []

export const todoListsReducer = (state: Array<TodoListsType> = initialState, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof removeTodoListAC>
| ReturnType<typeof addTodoListAC> 
| ReturnType<typeof changeTodoListTitleAC> 
| ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodoListAC = (title: string) => ({type: 'ADD-TODOLIST', id: v1(), title} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodoListFilterAC = (id: string, filter: ValueFilterType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
