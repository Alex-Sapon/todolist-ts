import {v1} from 'uuid';
import {TodolistType, ValueFilterType} from '../../api/todolist-api';

export const todoListsReducer = (state: Array<TodoListsDomainType> = [], action: ActionsType): Array<TodoListsDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todoListId);
        case 'ADD-TODOLIST':
            return [{
                id: action.payload.todoListId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.payload.todoListId
                ? {...todo, title: action.payload.title} : todo);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.payload.todoListId
                ? {...todo, filter: action.payload.filter} : todo);
        default:
            return state;
    }
}

// actions
export const removeTodoListAC = (todoListId: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        todoListId,
    }
} as const);
export const addTodoListAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todoListId: v1(),
        title,
    }
} as const);
export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todoListId,
        title,
    }
} as const);
export const changeTodoListFilterAC = (todoListId: string, filter: ValueFilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todoListId,
        filter
    }
} as const);

// thunks

// types
export type TodoListsDomainType = TodolistType & {
    filter: ValueFilterType
}
type ActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
