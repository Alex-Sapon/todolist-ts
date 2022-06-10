import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../../store/reducers/tasks-reducer';
import {todoListsReducer} from '../../store/reducers/todolists-reducer';
import {TaskPriority, TaskStatus} from '../../api/todolist-api';
import { appReducer } from '../../store/reducers/app-reducer';

const storyBookReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
});

const initialGlobalState: RootSBState = {
    todoLists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', entityStatus: 'idle',addedDate: '', order: 0},
        {id: 'todoListId2', title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
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
            {
                id: v1(),
                title: 'TypeScript',
                description: '',
                status: TaskStatus.New,
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
                title: 'Redux',
                description: '',
                status: TaskStatus.New,
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
                title: 'Rest API',
                description: '',
                status: TaskStatus.New,
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
            {
                id: v1(),
                title: 'Phone',
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
    },
};

type RootSBState = ReturnType<typeof storyBookReducer>;

const storyBookStore = createStore(storyBookReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};