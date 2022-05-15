import {changeStatusAC, changeValueTaskAC, removeTaskAC} from '../../../store/tasks-reducer';
import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, ListItem, Paper} from '@mui/material';
import styles from './Task.module.css';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../../../App';
import EditIcon from '@mui/icons-material/Edit';
import {useAppDispatch} from '../../../store/hooks';

export type TaskPropsType = {
    task: TaskType
    todoListID: string
};

export const Task = React.memo(({task, todoListID}: TaskPropsType) => {
    const dispatch = useAppDispatch();

    const removeHandler = useCallback(() => {
        dispatch(removeTaskAC(todoListID, task.id))
    }, [dispatch, todoListID, task.id]);
    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC(todoListID, e.currentTarget.checked, task.id));
    }, [dispatch, todoListID, task.id]);
    const changeValueHandler = useCallback((value: string) => {
        dispatch(changeValueTaskAC(todoListID, value, task.id));
    }, [dispatch, todoListID, task.id]);

    return (
        <ListItem>
            <Paper className={styles.item_container} sx={{backgroundColor: '#cce8ff'}}>
                <Checkbox size="small" checked={task.isDone} onChange={changeStatusHandler}/>
                <EditableSpan
                    title={task.title}
                    changeValue={changeValueHandler}
                    textStyles={styles.item_title}
                ><EditIcon className={styles.item_edit}/></EditableSpan>
                <DeleteIcon className={styles.item_delete} onClick={removeHandler}/>
            </Paper>
        </ListItem>
    )
});