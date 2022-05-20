import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import { v1 } from 'uuid';
import {tasksReducer} from '../../store/tasks-reducer';
import {todoListsReducer} from '../../store/todolists-reducer';

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
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript/ES6', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
        ],
        ['todoListId2']: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Phone', isDone: false},
        ]
    }
};

type RootSBState = ReturnType<typeof storyBookReducer>;

const storyBookStore = createStore(storyBookReducer, initialGlobalState as RootSBState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};