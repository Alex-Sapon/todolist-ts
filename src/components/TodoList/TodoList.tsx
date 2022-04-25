import React from 'react';
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
    addTodoList: (value: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export const TodoList = React.memo((props: TodoListProps) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[props.todoListId])

    let setTodoListTasks: Array<TaskType>;
    switch (props.filter) {
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

    const allFilterTasks = () => props.filterTasks(props.todoListId, 'all')
    const activeFilterTasks = () => props.filterTasks(props.todoListId, 'active')
    const completedFilterTasks = () => props.filterTasks(props.todoListId, 'completed')

    const addTodoList = (value: string) => dispatch(addTaskAC(props.todoListId, value))

    return (
        <Paper sx={{padding: '1rem'}} elevation={3}>
            <TodoListHeader
                title={props.title}
                removeTodoList={props.removeTodoList}
                todoListId={props.todoListId}
                changeTodoListTitle={props.changeTodoListTitle}
            />
            <AddItemForm addItem={addTodoList} title={'Add task'} errorText={'Task is required'}/>
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
            <TasksList tasks={setTodoListTasks} todoListId={props.todoListId}/>
        </Paper>
    )
})

