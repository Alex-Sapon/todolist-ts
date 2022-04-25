import React, {ChangeEvent, FC} from 'react';
import {TaskType} from '../../App';

import styles from './TasksList.module.css'
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Checkbox, List, ListItem, Paper, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { changeStatusAC, changeValueTaskAC, removeTaskAC } from '../../state/tasks-reducer';
import { useDispatch } from 'react-redux';

export type TasksList = {
    todoListId: string
    tasks: Array<TaskType>
}

export const TasksList: FC<TasksList> = React.memo(({todoListId, tasks}) => {
    console.log('TaskList')

    const dispatch = useDispatch()
    if (tasks.length === 0) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return (
        <List>
            {tasks.map(task => {
                    const removeHandler = () => dispatch(removeTaskAC(todoListId, task.id))
                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeStatusAC(todoListId, e.currentTarget.checked, task.id))
                    }
                    const changeValueHandler = (value: string) => {
                        dispatch(changeValueTaskAC(todoListId, value, task.id))
                    }

                    return (
                        <ListItem key={task.id} className={styles.list_item_wrapper}>
                            <Paper className={styles.list_item} sx={{backgroundColor: '#b3e5fc'}}>
                                <Checkbox size='small' checked={task.isDone} onChange={changeStatusHandler}/>
                                <EditableSpan
                                    title={task.title}
                                    changeValue={changeValueHandler}
                                    textStyles={styles.item_title}
                                />
                                <DeleteIcon className={styles.delete} onClick={removeHandler}/>
                            </Paper>
                        </ListItem>
                    )
                }
            )}
        </List>
    )
})
