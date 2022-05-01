import React from 'react';
import {TaskType} from '../../App';
import {List, Typography} from '@mui/material';
import {Task} from './Task/Task';

export type TasksList = {
    tasks: Array<TaskType>
    todoListId: string
};

export const TasksList = React.memo((props: TasksList) => {
    console.log('TaskList');

    const {todoListId, tasks} = props;

    if (tasks.length === 0) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return (
        <List>
            {tasks.map(task => <Task key={task.id} task={task} todoListID={todoListId}/>)}
        </List>
    )
});
