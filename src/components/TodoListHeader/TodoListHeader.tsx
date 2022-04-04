import React, {FC} from 'react';
import styles from './TodoListHeader.module.css'
import ButtonRemove from '../../UI/ButtonRemove/ButtonRemove';
import {EditableSpan} from '../EditableSpan/EditableSpan';

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
            <ButtonRemove onClick={removeTodoListHandler} className={styles.header_button_remove}/>
        </div>
    );
};

export default TodoListHeader;