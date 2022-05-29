import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../../features/TodolistsList/tasks-reducer';
import {todoListsReducer} from '../../features/TodolistsList/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';

const storyBookReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
});

const initialGlobalState: RootSBState = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todoListId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ],
    tasks: {
        ['todoListId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
            },
            {
                id: v1(),
                title: 'JavaScript/ES6',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
            },
            {
                id: v1(),
                title: 'React',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',

            },
            {
                id: v1(),
                title: 'TypeScript',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Redux',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Rest API',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
            },
        ],
        ['todoListId2']: [
            {
                id: v1(),
                title: 'Book',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Milk',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: '',

            },
            {
                id: v1(),
                title: 'Phone',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: '',
            },
        ]
    }
};

type RootSBState = ReturnType<typeof storyBookReducer>;

const storyBookStore = createStore(storyBookReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};