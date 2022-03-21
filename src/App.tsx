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
    // C - create
    // R - read
    // U - update
    // D - delete
    // BLL

    const todoListTitle = 'What to learn';
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript/ES6', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]);

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const changeStatus = (isDone: boolean, id: string) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task))
    }

    const [filter, setFilter] = useState<ValueFilterType>('all');

    const filterTasks = (value: ValueFilterType) => setFilter(value);

    const addTask = (value: string) => {
        setTasks([{id: v1(), title: value, isDone: false}, ...tasks])
    }

    let setTodoTasks;
    switch (filter) {
        case 'active':
            setTodoTasks = tasks.filter(task => !task.isDone);
            break;
        case 'completed':
            setTodoTasks = tasks.filter(task => task.isDone);
            break;
        default:
            setTodoTasks = tasks;
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
                isChecked={changeStatus}
                filter={filter}
            />
        </div>
    );
}