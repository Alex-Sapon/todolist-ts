import {v1} from 'uuid';
import {ResponseCode, todolistAPI, TodolistType, ValueFilterType} from '../../api/todolist-api';
import {Dispatch} from 'redux';

export const todoListsReducer = (state: TodoListsDomainType[] = [], action: TodoListActionsType): TodoListsDomainType[] => {
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
        case 'SET-TODOLISTS':
            return action.payload.todoLists.map(todo => ({...todo, filter: 'all'}));
        default:
            return state;
    }
}

// ------- actions
export const removeTodoListAC = (todoListId: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        todoListId,
    },
} as const);

export const addTodoListAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todoListId: v1(),
        title,
    },
} as const);

export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todoListId,
        title,
    },
} as const);

export const changeTodoListFilterAC = (todoListId: string, filter: ValueFilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todoListId,
        filter,
    },
} as const);

export const setTodoLists = (todoLists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    payload: {
        todoLists,
    },
} as const);

// ------- thunks
export const fetchTodoLists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then(res => {
        dispatch(setTodoLists(res.data));
    })
};

export const removeTodoList = (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todoListId).then(res => {
        if (res.data.resultCode === ResponseCode.Success) {
            dispatch(removeTodoListAC(todoListId));
        }
    })
};

// ------- types
export type TodoListsDomainType = TodolistType & {
    filter: ValueFilterType
}
export type TodoListActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoLists>
