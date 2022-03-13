import React, {FC, useState} from 'react';
import {TaskType, ValueFilterType} from '../../App';

import TodoListHeader from '../TodoListHeader/TodoListHeader';
import TasksList from '../TasksList/TasksList';
import Button from '../Button/Button';
import Input from '../Input/Input';

import {Box} from '@mui/material';
import styles from './TodoList.module.css'

export type TodoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTasks: (value: ValueFilterType) => void
    addTask: (value: string) => void
}

const TodoList: FC<TodoListProps> = (props) => {
    const [value, setValue] = useState('')

    const onClickKeyPressHandler = () => {
        if (value.length) {
            props.addTask(value)
            setValue('')
        }
    }

    return (
        <Box>
            <TodoListHeader title={props.title}/>
            <div className={styles.input_block}>
                <Input value={value} setValue={setValue} onKeyPressHandler={onClickKeyPressHandler}/>
                <Button title={'Add task'} onClick={onClickKeyPressHandler}/>
            </div>
            <div className={styles.buttons}>
                <Button title={'All'} onClick={() => props.filterTasks('all')}/>
                <Button title={'Active'} onClick={() => props.filterTasks('active')}/>
                <Button title={'Completed'} onClick={() => props.filterTasks('completed')}/>
            </div>
            <div>
                <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
            </div>
        </Box>
    )
}

export default TodoList;

