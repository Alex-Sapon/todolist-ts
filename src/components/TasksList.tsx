import React, {FC} from 'react';
import {TaskType} from "../App";
import {Checkbox, List, ListItem, Typography} from "@mui/material";
import Button from "./Button/Button";

export type TasksList = {
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

const TasksList: FC<TasksList> = (props) => {
    return (
        <List>
            {
                props.tasks.map(task =>
                    <ListItem key={task.id} sx={{border: 'solid 2px grey', borderRadius: '5px', marginBottom: '1rem'}}>
                        <Checkbox checked={task.isDone} size={'small'}/>
                        <Typography variant={'subtitle1'} sx={{width: '100%'}}>{task.title}</Typography>
                        <Button title={'x'} onClick={() => props.removeTask(task.id)}/>
                    </ListItem>
                )
            }
        </List>
    );
};

export default TasksList;