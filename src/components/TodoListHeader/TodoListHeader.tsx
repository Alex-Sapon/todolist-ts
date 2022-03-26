import React, {FC} from 'react';
import styles from './TodoListHeader.module.css'
import ButtonRemove from '../../UI/ButtonRemove/ButtonRemove';

type TodoListHeaderProps = {
    title: string
    removeTodoList: (todoListId: string) => void
    todoListId: string
}

const TodoListHeader: FC<TodoListHeaderProps> = ({title, removeTodoList, todoListId}) => {
    const removeTodoListHandler = () => removeTodoList(todoListId)

    return (
        <div className={styles.header_container}>
            <h2 className={styles.title}>{title}</h2>
            <ButtonRemove onClick={removeTodoListHandler}/>
        </div>
    );
};

export default TodoListHeader;