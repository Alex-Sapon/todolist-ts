import {combineReducers, legacy_createStore as createStore} from 'redux';
import {todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;