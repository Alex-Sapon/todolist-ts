import React, {FC} from 'react';
import styles from './TodoListHeader.module.css'
import ButtonRemove from '../../UI/ButtonRemove/ButtonRemove';
import {EditableSpan} from '../EditableSpan/EditableSpan';

type TodoListHeaderProps = {
    title: string
    removeTodoList: (todoListId: string) => void
    todoListId: string
    changeTodoListTitle: (todolistId: string, title: string) => void
}

const TodoListHeader: FC<TodoListHeaderProps> = ({title, removeTodoList, todoListId, changeTodoListTitle}) => {
    const removeTodoListHandler = () => removeTodoList(todoListId)
    const onChangeValueHandler = (title: string) => changeTodoListTitle(todoListId, title)

    return (
        <div className={styles.header_container}>
            <EditableSpan title={title} changeValue={onChangeValueHandler} className={styles.title}/>
            <ButtonRemove onClick={removeTodoListHandler}/>
        </div>
    );
};

export default TodoListHeader;