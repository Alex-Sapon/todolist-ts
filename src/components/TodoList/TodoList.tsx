import React, {FC} from 'react';
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
}

const TodoList: FC<TodoListProps> = (props) => {
    return (
        <Box>
            <TodoListHeader title={props.title}/>
            <div className={styles.inputBlock}>
                <Input/>
                <Button title={'Add task'} onClick={() => props.removeTask}/>
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

