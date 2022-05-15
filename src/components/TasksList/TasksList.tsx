import React from 'react';
import {ValueFilterType} from '../../App';
import {List, Typography} from '@mui/material';
import {Task} from './Task/Task';
import {useAppSelector} from '../../store/hooks';

export type TasksList = {
    filter: ValueFilterType
    todoListId: string
};

export const TasksList = React.memo(({todoListId, filter}: TasksList) => {
    let tasks = useAppSelector(state => state.tasks[todoListId]);

    switch (filter) {
        case 'active':
            tasks = tasks.filter(task => !task.isDone);
            break;
        case 'completed':
            tasks = tasks.filter(task => task.isDone);
            break;
    }

    if (tasks.length === 0) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return (
        <List>
            {tasks.map(task => <Task key={task.id} task={task} todoListID={todoListId}/>)}
        </List>
    )
});
