import React, {FC} from 'react';
import {TaskType, ValueFilterType} from '../../App';

import TodoListHeader from '../TodoListHeader/TodoListHeader';
import TasksList from '../TasksList/TasksList';

import styles from './TodoList.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {Button, Paper} from '@mui/material'

export type TodoListProps = {
    title: string
    todoListId: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    filterTasks: (todoListId: string, title: ValueFilterType) => void
    addTask: (todoListId: string, title: string) => void
    isChecked: (todoListId: string, isDone: boolean, id: string) => void
    filter: ValueFilterType
    removeTodoList: (todoListId: string) => void
    addTodoList: (value: string) => void
    changeValueTask: (todoListId: string, title: string, id: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export const TodoList = React.memo((props: TodoListProps) => {
    const allFilterTasks = () => props.filterTasks(props.todoListId, 'all')
    const activeFilterTasks = () => props.filterTasks(props.todoListId, 'active')
    const completedFilterTasks = () => props.filterTasks(props.todoListId, 'completed')

    const addTodoList = (value: string) => props.addTask(props.todoListId, value)

    return (
        <Paper sx={{padding: '1rem'}} elevation={3}>
            <TodoListHeader
                title={props.title}
                removeTodoList={props.removeTodoList}
                todoListId={props.todoListId}
                changeTodoListTitle={props.changeTodoListTitle}
            />
            <AddItemForm
                addItem={addTodoList}
                title={'Add task'}
                errorText={'Task is required'}
            />
            <div className={styles.buttons}>
                <Button
                    size={'small'}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={allFilterTasks}
                >All</Button>
                <Button
                    size={'small'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={activeFilterTasks}
                    sx={{m: '0 1rem'}}
                >Active</Button>
                <Button
                    size={'small'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={completedFilterTasks}
                >Completed</Button>

            </div>
            <TasksList
                tasks={props.tasks}
                removeTask={props.removeTask}
                isChecked={props.isChecked}
                todoListId={props.todoListId}
                changeValueTask={props.changeValueTask}
            />
        </Paper>
    )
})

