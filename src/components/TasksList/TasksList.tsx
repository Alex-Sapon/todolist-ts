import React from 'react';
import {TaskType, ValueFilterType} from '../../App';
import {List, Typography} from '@mui/material';
import {Task} from './Task/Task';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../state/store';

export type TasksList = {
    filter: ValueFilterType
    todoListId: string
};

export const TasksList = React.memo((props: TasksList) => {
    const {todoListId, filter} = props;

    let tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[todoListId]);

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
