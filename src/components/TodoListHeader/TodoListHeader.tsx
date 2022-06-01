import React, {memo, useCallback} from 'react';
import styles from './TodoListHeader.module.css'
import {EditableSpan} from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

type TodoListHeaderType = {
    title: string
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
};

export const TodoListHeader = memo((props: TodoListHeaderType) => {
    const {title, removeTodoList, todoListId, changeTodoListTitle} = props;

    const removeTodoListHandler = useCallback(() => {
        removeTodoList(todoListId);
    }, [removeTodoList, todoListId])

    const onChangeValueHandler = useCallback((title: string) => {
        changeTodoListTitle(todoListId, title);
    }, [changeTodoListTitle, todoListId])

    return (
        <div className={styles.header_container}>
            <EditableSpan title={title} changeValue={onChangeValueHandler} textStyles={styles.header_title}/>
            <DeleteIcon className={styles.delete} onClick={removeTodoListHandler}/>
        </div>
    )
});