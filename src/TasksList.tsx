import React from 'react';
import {TaskType} from "./App";

export type TasksList = {
    tasks: Array<TaskType>
}

const TasksList = (props: TasksList) => {
    return (
        <ul>
            {
                props.tasks.map((task, i) => {
                    <li><input key={i} type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>
                })
            }
        </ul>
    );
};

export default TasksList;