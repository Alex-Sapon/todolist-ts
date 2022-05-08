import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todoListsReducer} from '../state/todolists-reducer';
import {RootStateType} from '../state/store';

const storyBookReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
});

const initialGlobalState = {
    todoLists: [
        {id: 'todoListId1', title: "What to learn", filter: "all"},
        {id: 'todoListId2', title: "What to buy", filter: "all"},
    ],
    tasks: {
        ['todoListId1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JavaScript/ES6', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'TypeScript', isDone: false},
            {id: '5', title: 'Redux', isDone: false},
            {id: '6', title: 'Rest API', isDone: false},
        ],
        ['todoListId2']: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Phone', isDone: false},
        ]
    }
};

const storyBookStore = createStore(storyBookReducer, initialGlobalState as RootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};