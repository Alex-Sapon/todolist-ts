import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {todoListsReducer} from '../store/reducers/todolists-reducer';
import {tasksReducer} from '../store/reducers/tasks-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;