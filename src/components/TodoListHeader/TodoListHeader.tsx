import React, {FC} from 'react';
import styles from './TodoListHeader.module.css'
import {EditableSpan} from '../EditableSpan/EditableSpan';
import { AddBox } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type TodoListHeaderProps = {
    title: string
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
}

const TodoListHeader: FC<TodoListHeaderProps> = ({title, removeTodoList, todoListId, changeTodoListTitle}) => {
    const removeTodoListHandler = () => removeTodoList(todoListId)
    const onChangeValueHandler = (title: string) => changeTodoListTitle(todoListId, title)

    return (
        <div className={styles.header_container}>
            <EditableSpan 
                title={title} 
                changeValue={onChangeValueHandler} 
                className={styles.header_title} 
                inputStyles={styles.header_title}
            />
            <IconButton onClick={removeTodoListHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default TodoListHeader;