import {selectTodoLists} from './selectors';
import {TodoList} from './Todolist/TodoList';
import {TodoListHeader} from './TodoListHeader/TodoListHeader';
import {
    asyncActions,
    changeTodoListEntityStatus,
    changeTodoListFilter,
    TodoListsDomainType,
    todoListsReducer,
    todoListsReducerSlice
} from './todolists-reducer';

const todoListsActions = {...asyncActions, ...todoListsReducerSlice.actions}

export {
    todoListsActions,
    todoListsReducer,
    changeTodoListEntityStatus,
    changeTodoListFilter,
    TodoList,
    selectTodoLists,
    TodoListHeader
};

export type {TodoListsDomainType};
