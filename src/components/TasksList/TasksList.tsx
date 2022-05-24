import React from 'react';
import {List, Typography} from '@mui/material';
import {Task} from './Task/Task';
import {useAppSelector} from '../../store/hooks';
import {TaskStatuses, ValueFilterType} from '../../api/todolist-api';

export type TasksList = {
    filter: ValueFilterType
    todoListId: string
};

export const TasksList = React.memo(({todoListId, filter}: TasksList) => {
    let tasks = useAppSelector(state => state.tasks[todoListId]);

    switch (filter) {
        case 'active':
            tasks = tasks.filter(task => task.status === TaskStatuses.New);
            break;
        case 'completed':
            tasks = tasks.filter(task => task.status === TaskStatuses.Completed);
            break;
    }

    if (tasks.length === 0) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return (
        <List>
            {tasks.map(task => <Task key={task.id} task={task} todoListID={todoListId}/>)}
        </List>
    )
});
