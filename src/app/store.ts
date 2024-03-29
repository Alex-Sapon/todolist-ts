import {combineReducers} from 'redux';
import {todoListsReducer, tasksReducer} from '../features/TodolistsList';
import {appReducer} from './app-reducer';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from '../features/Login';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;