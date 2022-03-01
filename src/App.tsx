import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    // BLL
    const todoListTitle_01 = "What to learn";

    const tasks_1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS/ES6', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    // UI
    return (
        <div className="App">
            <TodoList title={todoListTitle_01} tasks={tasks_1}/>
        </div>
    );
}

export default App;