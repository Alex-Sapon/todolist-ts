import React, {FC} from 'react';
import styles from './TodoListHeader.module.css'
import {EditableSpan} from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';

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
            <EditableSpan title={title} changeValue={onChangeValueHandler} textStyles={styles.header_title}/>
            <DeleteIcon className={styles.delete} onClick={removeTodoListHandler}/>
        </div>
    );
};

export default TodoListHeader;