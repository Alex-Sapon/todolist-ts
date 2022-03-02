import React, {FC} from 'react';
import {TaskType, ValueFilterType} from "../App";
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import Button from "./Button/Button";
import {TextField} from "@mui/material";

export type TodoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filterTasks: (value: ValueFilterType) => void
}

const TodoList: FC<TodoListProps> = (props) => {
    return (
        <div>
            <TodoListHeader title={props.title}/>
            <div>
                <TextField type={"text"} sx={{marginBottom: '1rem'}}/>
            </div>
            <Button title={"Add task"} onClick={() => props.removeTask}/>
            <div>
                <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
            </div>
            <div>
                <Button title={"All"} onClick={() => props.filterTasks('all')}/>
                <Button title={"Active"} onClick={() => props.filterTasks('active')}/>
                <Button title={"Completed"} onClick={() => props.filterTasks('completed')}/>
            </div>

        </div>
    )
}

export default TodoList;