import {removeTask, TaskDomainType, updateTaskStatus, updateTaskTitle} from '../../../../store/reducers/tasks-reducer';
import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, ListItem, Paper} from '@mui/material';
import styles from './Task.module.css';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useAppDispatch} from '../../../../store/hooks';
import {TaskStatus} from '../../../../api/todolist-api';
import {LoadingButton} from '@mui/lab';
import {grey} from '@mui/material/colors';

export type TaskPropsType = {
    task: TaskDomainType
}

export const Task = memo(({task}: TaskPropsType) => {
    const {id, todoListId, title, entityStatus, status} = task;

    const dispatch = useAppDispatch();

    const removeTaskHandler = () => dispatch(removeTask(todoListId, id));

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskStatus(todoListId, id, e.currentTarget.checked
            ? TaskStatus.Completed : TaskStatus.New));
    }

    const changeTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTitle(todoListId, id, title));
    }, [dispatch, todoListId, id])

    return (
        <ListItem>
            <Paper className={styles.item_container} sx={{backgroundColor: '#9AB8BA'}}>
                <Checkbox
                    size="small"
                    disabled={entityStatus === 'loading'}
                    checked={status === TaskStatus.Completed}
                    onChange={changeStatusHandler}
                    sx={{color: grey[100], '&.Mui-checked': {color: grey[600]}}}
                />
                <EditableSpan title={title} changeValue={changeTitleHandler} textStyles={styles.item_title}>
                    <EditIcon className={styles.item_edit}/>
                </EditableSpan>
                {entityStatus === 'loading'
                    ? <LoadingButton loading variant="text" sx={{minWidth: '24px'}}/>
                    : <DeleteIcon className={styles.item_delete} onClick={removeTaskHandler}/>
                }
            </Paper>
        </ListItem>
    )
});