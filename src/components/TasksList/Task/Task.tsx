import {removeTask, updateTaskStatus, updateTaskTitle} from '../../../store/reducers/tasks-reducer';
import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, ListItem, Paper} from '@mui/material';
import styles from './Task.module.css';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useAppDispatch} from '../../../store/hooks';
import {TaskStatus, TaskType} from '../../../api/todolist-api';

export type TaskPropsType = {
    task: TaskType
    todoListId: string
};

export const Task = memo(({task, todoListId}: TaskPropsType) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTask(todoListId, task.id))
    }, [dispatch, todoListId, task.id]);

    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskStatus(todoListId, task.id, e.currentTarget.checked
            ? TaskStatus.Completed : TaskStatus.New));
    }, [dispatch, todoListId, task.id]);

    const changeTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTitle(todoListId, task.id, title));
    }, [dispatch, todoListId, task.id]);

    return (
        <ListItem>
            <Paper className={styles.item_container} sx={{backgroundColor: '#9AB8BA'}}>
                <Checkbox size="small" checked={task.status === TaskStatus.Completed} onChange={changeStatusHandler}/>
                <EditableSpan title={task.title} changeValue={changeTitleHandler} textStyles={styles.item_title}>
                    <EditIcon className={styles.item_edit}/>
                </EditableSpan>
                <DeleteIcon className={styles.item_delete} onClick={removeTaskHandler}/>
            </Paper>
        </ListItem>
    )
});