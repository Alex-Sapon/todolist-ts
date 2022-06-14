import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TodoListActionsType, todoListsReducer} from './reducers/todolists-reducer';
import {TasksActionsType, tasksReducer} from './reducers/tasks-reducer';
import {AppActionsType, appReducer} from './reducers/app-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {AuthActionsType, authReducer} from './reducers/auth-reducer';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>;

export type RootActionsType =
    | TodoListActionsType
    | TasksActionsType
    | AppActionsType
    | AuthActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>


// @ts-ignore
window.store = store;