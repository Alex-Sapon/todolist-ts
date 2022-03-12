import React, {FC} from 'react';
import {TaskType} from '../../App';
import Button from '../Button/Button';

import {Checkbox, List, ListItem, Typography} from '@mui/material';
import styles from './TasksList.module.css'

export type TasksList = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}

const TasksList: FC<TasksList> = (props) => {
    return (
        <List>
            {props.tasks.map(task =>
                <ListItem className={styles.listItem} key={task.id}>
                    <Checkbox checked={task.isDone} size={'small'}/>
                    <Typography variant={'subtitle1'} sx={{width: '100%'}}>{task.title}</Typography>
                    <Button className={styles.button} title={'x'} onClick={() => props.removeTask(task.id)}/>
                </ListItem>
            )}
        </List>
    );
};

export default TasksList;