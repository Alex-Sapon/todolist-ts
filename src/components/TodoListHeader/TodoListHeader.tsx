import React, {FC} from 'react';
import {Typography} from "@mui/material";
import styles from './TodoListHeader.module.css'

type TodoListHeaderPropsType = {
    title: string
}

const TodoListHeader: FC<TodoListHeaderPropsType> = (props) => {
    return (
        <Typography variant={'h4'} className={styles.title}>{props.title}</Typography>
    );
};

export default TodoListHeader;