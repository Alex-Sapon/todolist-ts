import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {todoListsReducer} from './reducers/todolists-reducer';
import {tasksReducer} from './reducers/tasks-reducer';
import {appReducer} from './reducers/app-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;