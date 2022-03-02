import React, {FC} from 'react';
import {Typography} from "@mui/material";

type TodoListHeaderPropsType = {
    title: string
}

const TodoListHeader: FC<TodoListHeaderPropsType> = (props) => {
    return (
        <div>
            <Typography variant={'h4'} sx={{marginBottom: '1rem'}}>{props.title}</Typography>
        </div>
    );
};

export default TodoListHeader;