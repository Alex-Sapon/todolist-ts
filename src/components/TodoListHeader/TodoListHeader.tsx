import React, {FC} from 'react';
import styles from './TodoListHeader.module.css'

type TodoListHeaderPropsType = {
    title: string
}

const TodoListHeader: FC<TodoListHeaderPropsType> = (props) => {
    return (
        <h2 className={styles.title}>{props.title}</h2>
    );
};

export default TodoListHeader;