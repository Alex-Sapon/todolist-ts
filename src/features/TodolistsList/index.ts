import {selectTasks, selectTodoLists} from './selectors';
import {TodoList} from './Todolist/TodoList';
import {TodoListHeader} from './TodoListHeader/TodoListHeader';
import {TodolistsList} from './TodolistsList';
import {asyncTasksActions, TaskDomainType, tasksReducer, TasksStateType, updateTask} from './tasks-reducer';
import {Task} from './Task/Task';
import {TasksList} from './TasksList/TasksList';
import {
    asyncTodoActions,
    changeTodoListEntityStatus,
    changeTodoListFilter,
    RejectType,
    TodoListsDomainType,
    todoListsReducer,
    todoListsReducerSlice,
} from './todolists-reducer';

const todoListsActions = {...asyncTodoActions, ...todoListsReducerSlice.actions}
const tasksActions = {...asyncTasksActions}

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
    TasksList,
    updateTask
};

export type {TodoListsDomainType, TaskDomainType, RejectType, TasksStateType};
