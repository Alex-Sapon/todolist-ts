import {memo, useCallback} from 'react';
import styles from './TodoListHeader.module.css';
import {EditableSpan} from '../../../components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {RequestStatusType} from '../../../app';
import {IconButton} from '@mui/material';

type TodoListHeaderType = {
    title: string
    todoListId: string
    entityStatus: RequestStatusType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (params: {todoListId: string, title: string}) => void
};

export const TodoListHeader = memo((props: TodoListHeaderType) => {
    const {title, removeTodoList, todoListId, changeTodoListTitle, entityStatus} = props;

    const removeTodoListHandler = useCallback(() => {
        removeTodoList(todoListId);
    }, [removeTodoList, todoListId])

    const onChangeValueHandler = useCallback((title: string) => {
        changeTodoListTitle({todoListId, title});
    }, [changeTodoListTitle, todoListId])

    return (
        <div className={styles.header_container}>
            <EditableSpan title={title} changeValue={onChangeValueHandler} textStyles={styles.header_title}/>
            <IconButton disabled={entityStatus === 'loading'} onClick={removeTodoListHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
});