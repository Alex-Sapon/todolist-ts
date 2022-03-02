import React, {FC} from 'react';
import {TaskType} from "../App";
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import Button from "./Button/Button";
import {TextField, ButtonGroup} from "@mui/material";

export type TodoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    // changeFilter?: (value: FilterValuesType) => void
}

const TodoList: FC<TodoListProps> = (props) => {
    return (
        <div>
            <TodoListHeader title={props.title}/>
            <div>
                <TextField type={"text"}/>
                <Button title={"+"}/>
            </div>
            <div>
                <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
            </div>

            <ButtonGroup>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </ButtonGroup>
        </div>
    )
}

export default TodoList;