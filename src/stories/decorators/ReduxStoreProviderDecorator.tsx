import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../../features/TodolistsList/tasks-reducer';
import {todoListsReducer} from '../../features/TodolistsList/todolists-reducer';
import {TaskPriority, TaskStatus} from '../../api/todolist-api';
import {appReducer} from '../../app/app-reducer';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from '../../features/Login/auth-reducer';
import {HashRouter} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';

const storyBookReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
});

const initialGlobalState: RootSBState = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', entityStatus: 'idle',addedDate: '', order: 0},
        {id: 'todoListId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order: 0},
    ],
    tasks: {
        ['todoListId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                description: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: v1(),
                title: 'JavaScript/ES6',
                description: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: v1(),
                title: 'React',
                description: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
        ],
        ['todoListId2']: [
            {
                id: v1(),
                title: 'Book',
                description: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: v1(),
                title: 'Milk',
                description: '',
                status: TaskStatus.New,
                priority: TaskPriority.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId2',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',

            },
        ]
    },
    app: {
        status: 'idle',
        errorMessage: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    }
};

type RootSBState = ReturnType<typeof storyBookReducer>;

const storyBookStore = configureStore({
    reducer: storyBookReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

export const BrowserRouterDecorator = (storyFn: any) => {
    return <HashRouter>{storyFn()}</HashRouter>
}