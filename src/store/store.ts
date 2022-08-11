import {combineReducers} from 'redux';
import {TodoListActionsType, todoListsReducer} from './reducers/todolists-reducer';
import {TasksActionsType, tasksReducer} from './reducers/tasks-reducer';
import {AppActionsType, appReducer} from './reducers/app-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {AuthActionsType, authReducer} from './reducers/auth-reducer';
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

export type RootActionsType =
    | TodoListActionsType
    | TasksActionsType
    | AppActionsType
    | AuthActionsType;

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>

// @ts-ignore
window.store = store;