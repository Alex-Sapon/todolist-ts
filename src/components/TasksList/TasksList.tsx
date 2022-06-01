import React, {memo, useEffect} from 'react';
import {List, Typography} from '@mui/material';
import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {TaskStatus, ValueFilterType} from '../../api/todolist-api';
import {fetchTasks} from '../../store/reducers/tasks-reducer';

export type TasksList = {
    filter: ValueFilterType
    todoListId: string
};

export const TasksList = memo(({todoListId, filter}: TasksList) => {
    const dispatch = useAppDispatch();

    let tasks = useAppSelector(state => state.tasks[todoListId]);

    useEffect(() => {
        dispatch(fetchTasks(todoListId));
    }, [])

    switch (filter) {
        case 'active':
            tasks = tasks.filter(task => task.status === TaskStatus.New);
            break;
        case 'completed':
            tasks = tasks.filter(task => task.status === TaskStatus.Completed);
            break;
    }

    if (tasks.length === 0) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return (
        <List>
            {tasks.map(task => <Task key={task.id} task={task} todoListId={todoListId}/>)}
        </List>
    )
});
