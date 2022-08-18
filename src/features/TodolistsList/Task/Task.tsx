import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, ListItem, Paper} from '@mui/material';
import styles from './Task.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {LoadingButton} from '@mui/lab';
import {grey} from '@mui/material/colors';
import {TaskStatus} from '../../../api/todolist-api';
import {EditableSpan} from '../../../components/EditableSpan';
import {useActions, useAppSelector} from '../../../utils/hooks';
import {tasksActions, TaskDomainType} from '../';

export type TaskPropsType = {
    task: TaskDomainType
}

export const Task = memo(({task}: TaskPropsType) => {
    const {id, todoListId, title, entityStatus, status} = task;

    const appLoadingStatus = useAppSelector(state => state.app.status);

    const {removeTask, updateTaskStatus, updateTaskTitle} = useActions(tasksActions);

    const removeTaskHandler = () => {
        if (appLoadingStatus !== 'loading') {
            removeTask({todoListId: todoListId, taskId: id});
        }
    };

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateTaskStatus({todoListId: todoListId, taskId: id, status: e.currentTarget.checked
            ? TaskStatus.Completed : TaskStatus.New});
    }

    const changeTitleHandler = useCallback((title: string) => {
        updateTaskTitle({todoListId, taskId: id, title});
    }, [updateTaskTitle, todoListId, id])

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
                    : <DeleteIcon className={styles.item_delete} onClick={removeTaskHandler}/>}
            </Paper>
        </ListItem>
    )
});