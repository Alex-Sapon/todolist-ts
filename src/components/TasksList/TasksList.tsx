import React, {ChangeEvent, FC} from 'react';
import {TaskType} from '../../App';

import styles from './TasksList.module.css'
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Checkbox, IconButton, List, ListItem, Paper, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type TasksList = {
    todoListId: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    isChecked: (todoListId: string, isDone: boolean, id: string) => void
    changeValueTask: (todoListId: string, title: string, id: string) => void
}

const TasksList: FC<TasksList> = ({todoListId, tasks, isChecked, removeTask, changeValueTask}) => {
    if (tasks.length === 0) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return (
        <List>
            {tasks.map(task => {
                    const onRemoveHandler = () => removeTask(todoListId, task.id)
                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        isChecked(todoListId, event.currentTarget.checked, task.id)
                    }
                    const onChangeValueHandler = (value: string) => changeValueTask(todoListId, value, task.id)

                    return (
                        <ListItem key={task.id} className={styles.list_item_wrapper}>
                            <Paper className={styles.list_item}>
                                <Checkbox size='small' checked={task.isDone} onChange={onChangeStatusHandler}/>
                                <EditableSpan
                                    title={task.title}
                                    changeValue={onChangeValueHandler}
                                    textStyles={styles.item_title}
                                />
                                <DeleteIcon className={styles.delete} onClick={onRemoveHandler}/>
                            </Paper>
                        </ListItem>
                    )
                }
            )}
        </List>
    );
};

export default TasksList;