import React, {FC} from 'react';
import {TaskType} from "../App";
import {List, ListItem} from "@mui/material";


export type TasksList = {
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

const TasksList: FC<TasksList> = (props) => {
    return (
        <List>
            {
                props.tasks.map(task =>
                    <ListItem>
                        <input key={task.id} type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>x</button>
                    </ListItem>
                )
            }
        </List>
    );
};

export default TasksList;