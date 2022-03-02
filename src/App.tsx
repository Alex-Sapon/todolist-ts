import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {

    const todoListTitle = "What to learn";
    const initTasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS/ES6', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
        {id: 5, title: 'Redux', isDone: false}
    ];

    const removeTask = () => {

    }

    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={initTasks} removeTask={removeTask}/>
        </div>
    );
}