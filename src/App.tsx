import React, {useState} from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList/TodoList';
import {v1} from 'uuid';
import todoList from './components/TodoList/TodoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListsProps = {
    id: string
    title: string
    filter: ValueFilterType
}

export type ValueFilterType = 'all' | 'active' | 'completed';

type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {
    // C - create
    // R - read
    // U - update
    // D - delete
    // BLL

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListsProps[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript/ES6', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Phone', isDone: false}
        ]
    })

    const changeFilter = (value: ValueFilterType, todoListId: string) => {
        const todoList = todoLists.find(todo => todo.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    };

    const removeTask = (id: string, todoListId: string) => {
        // достанем нужный массив (tasks[todoListId]) по todolistId
        // перезапишем в этом объекте массив для нужного тудулиста отфильтрованным массивом
        tasks[todoListId] = tasks[todoListId].filter(task => task.id !== id)
        setTasks({...tasks}) // сетаем в стейт копию объекта, чтобы React отреагировал перересовкой
    }

    const addTask = (value: string, todoListId: string) => {
        // достанем нужный массив по todolistId
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавиви в начало новую таску
        tasks[todoListId] = [{id: v1(), title: value, isDone: false}, ...tasks[todoListId]]
        setTasks({...tasks})
    }

    const changeStatus = (isDone: boolean, id: string, todoListId: string) => {
        tasks[todoListId].map(task => task.id === id ? task.isDone = isDone : task)
        setTasks({...tasks})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    return (
        <div className={styles.container}>
            {todoLists.length === 0 && <div className={styles.no_todo}>No TodoLists...</div>}
            {todoLists.map(todo => {
                let setTodoListTasks;
                switch (todo.filter) {
                    case 'active':
                        setTodoListTasks = tasks[todo.id].filter(task => !task.isDone);
                        break;
                    case 'completed':
                        setTodoListTasks = tasks[todo.id].filter(task => task.isDone);
                        break;
                    default:
                        setTodoListTasks = tasks[todo.id];
                        break;
                }

                return (
                    <TodoList
                        key={todo.id}
                        todoListId={todo.id}
                        title={todo.title}
                        tasks={setTodoListTasks}
                        removeTask={removeTask}
                        filterTasks={changeFilter}
                        addTask={addTask}
                        isChecked={changeStatus}
                        filter={todo.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}