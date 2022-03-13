import React, {useState} from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList/TodoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ValueFilterType = 'all' | 'active' | 'completed';

export const App = () => {
    const todoListTitle = 'What to learn';
    const initTasks = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS/ES6', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ];

    const [tasks, setTasks] = useState<TaskType[]>(initTasks);

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const [filter, setFilter] = useState<ValueFilterType>('all');

    const filterTasks = (value: ValueFilterType) => setFilter(value);

    const addTask = (value: string) => {
        setTasks([{id: v1(), title: value, isDone: false}, ...tasks])
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
        <div className={styles.container}>
            <TodoList
                title={todoListTitle}
                tasks={setTodoTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}