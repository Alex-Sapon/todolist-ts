import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type ValueFilterType = 'all' | 'active' | 'completed';

export const App = () => {
    const todoListTitle = "What to learn";
    const initTasks = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS/ES6', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
        {id: 5, title: 'Redux', isDone: false}
    ];

    const [tasks, setTasks] = useState<TaskType[]>(initTasks);
    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

    const [filter, setFilter] = useState<ValueFilterType>('all');

    const filterTasks = (value: ValueFilterType) => {
        setFilter(value);
    }

    let setTodoTasks = tasks;
    switch (filter) {
        case 'active':
            setTodoTasks = tasks.filter(task => task.isDone === false);
            break;
        case 'completed':
            setTodoTasks = tasks.filter(task => task.isDone === true);
            break;
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={setTodoTasks} removeTask={removeTask} filterTasks={filterTasks}/>
        </div>
    );
}