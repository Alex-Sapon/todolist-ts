import {combineReducers} from 'redux';
import {todoListsReducer} from './reducers/todolists-reducer';
import {tasksReducer} from './reducers/tasks-reducer';
import {appReducer} from './reducers/app-reducer';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './reducers/auth-reducer';
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