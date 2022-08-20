import {selectTodoLists, selectTasks} from './selectors';
import {TodoList} from './Todolist/TodoList';
import {TodoListHeader} from './TodoListHeader/TodoListHeader' ;
import {TodolistsList} from './TodolistsList';
import {tasksReducer, tasksSlice, asyncTasksActions, TaskDomainType} from './tasks-reducer';
import {Task} from './Task/Task';
import {TasksList} from './TasksList/TasksList';
import {
    asyncTodoActions,
    changeTodoListEntityStatus,
    changeTodoListFilter,
    TodoListsDomainType,
    todoListsReducer,
    todoListsReducerSlice,
    RejectType,
} from './todolists-reducer';

const todoListsActions = {...asyncTodoActions, ...todoListsReducerSlice.actions}
const tasksActions = {...asyncTasksActions, ...tasksSlice.actions}

export {
    todoListsActions,
    todoListsReducer,
    changeTodoListEntityStatus,
    changeTodoListFilter,
    TodoList,
    selectTodoLists,
    selectTasks,
    TodoListHeader,
    TodolistsList,
    tasksReducer,
    tasksActions,
    Task,
    TasksList
};

export type {TodoListsDomainType, TaskDomainType, RejectType};
