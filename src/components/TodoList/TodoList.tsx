import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {TodoListHeader} from '../TodoListHeader/TodoListHeader';
import {TasksList} from '../TasksList/TasksList';
import {AddItemForm} from '../AddItemForm/AddItemForm';

import styles from './TodoList.module.css'
import {Button, Paper} from '@mui/material'

import {TaskType, ValueFilterType} from '../../App';
import {RootStateType} from '../../state/store';
import {addTaskAC} from '../../state/tasks-reducer';

export type TodoListProps = {
    title: string
    todoListId: string
    filterTasks: (todoListId: string, title: ValueFilterType) => void
    filter: ValueFilterType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export const TodoList = React.memo((props: TodoListProps) => {
    console.log('TodoList')

    const {title, todoListId, filterTasks, filter, removeTodoList, changeTodoListTitle} = props
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[todoListId])

    let setTodoListTasks: Array<TaskType>;
    switch (filter) {
        case 'active':
            setTodoListTasks = tasks.filter(task => !task.isDone);
            break;
        case 'completed':
            setTodoListTasks = tasks.filter(task => task.isDone);
            break;
        default:
            setTodoListTasks = tasks;
            break;
    }

    const allFilterTasks = useCallback(() => {
        filterTasks(todoListId, 'all')
    }, [filterTasks, todoListId])
    const activeFilterTasks = useCallback(() => {
        filterTasks(todoListId, 'active')
    }, [filterTasks, todoListId])
    const completedFilterTasks = useCallback(() => {
        filterTasks(todoListId, 'completed')
    }, [filterTasks, todoListId])

    const addTask = (value: string) => dispatch(addTaskAC(todoListId, value))

    return (
        <Paper sx={{padding: '1rem'}} elevation={3}>
            <TodoListHeader
                title={title}
                removeTodoList={removeTodoList}
                todoListId={todoListId}
                changeTodoListTitle={changeTodoListTitle}
            />
            <AddItemForm addItem={addTask} title={'Add task'} errorText={'Task is required'}/>
            <div className={styles.buttons}>
                <Button
                    size={'small'}
                    variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={allFilterTasks}
                >All</Button>
                <Button
                    size={'small'}
                    variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={activeFilterTasks}
                    sx={{m: '0 1rem'}}
                >Active</Button>
                <Button
                    size={'small'}
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={completedFilterTasks}
                >Completed</Button>
            </div>
            <TasksList tasks={setTodoListTasks} todoListId={todoListId}/>
        </Paper>
    )
})

