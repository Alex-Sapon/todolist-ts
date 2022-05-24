import React, {ChangeEvent, useEffect, useState} from 'react';
import {TaskType, todolistAPI, TodolistType} from '../api/todolist-api';
import {Simulate} from 'react-dom/test-utils';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>([]);

    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data));

    }, []);

    return (
        <div>
            {state.map(i =>
                <div>
                    <div>title: {i.title}</div>
                    <div>id: {i.id}</div>
                    <div>order: {i.order}</div>
                    <div>addedDate: {i.addedDate}</div>
                    <br/>
                </div>
            )}
        </div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTodolist = () => {
        todolistAPI.createTodolist(title).then(res => setState(res.data));
        setTitle('');
    }

    return (
        <div>
            <input value={title} type="text" placeholder={'new todolist'} onChange={changeTitle}/>
            <button onClick={addTodolist}>add todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [delTodolist, setDelTodolist] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDelTodolist(e.currentTarget.value);
    }

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(delTodolist).then(res => setState(res.data));
        setDelTodolist('');
    }

    return (
        <div>
            <input value={delTodolist} type="text" placeholder={'delete todolist'} onChange={onChangeHandler}/>
            <button onClick={deleteTodolist}>del todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolistTitle(todolistId, title).then(res => setState(res.data));
        setTodolistId('');
        setTitle('');
    }

    return (
        <div>
            <input type="text" placeholder={'todolistId'} onChange={onChangeTodolistId}/>
            <input type="text" placeholder={'title'} onChange={onChangeTitle}/>
            <button onClick={updateTodolistTitle}>update todolist title</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const GetTasks = () => {
    const [state, setState] = useState<TaskType[]>([]);
    const [todolistId, setTodolistId] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const getTasks = () => {
        todolistAPI.getTasks(todolistId).then(res => setState(res.data.items));
        setTodolistId('');
    }


    return (
        <div>
            <input type="text" placeholder={'todolistId'} onChange={onChangeHandler} value={todolistId}/>
            <button onClick={getTasks}>get tasks</button>
            {state.map(i =>
                <div key={i.id}>
                    <div>title: {i.title}</div>
                    <div>id: {i.id}</div>
                    <div>order: {i.order}</div>
                    <div>addedDate: {i.addedDate}</div>
                    <div>startDate: {i.startDate}</div>
                    <div>deadline: {i.deadline}</div>
                    <div>description: {i.description}</div>
                    <div>priority: {i.priority}</div>
                    <div>todoListId: {i.todoListId}</div>
                    <br/>
                </div>
            )}
        </div>
    )
}

export const SetTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');

    const onSetTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const onSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }

    const onClickHandler = () => {
        todolistAPI.createTask(todolistId, taskTitle).then(res => setState(res.data));
        setTodolistId('');
        setTaskTitle('');
    }

    return (
        <div>
            <input type="text" placeholder={'todolistId'} onChange={onSetTodolistId} value={todolistId}/>
            <input type="text" placeholder={'task title'} onChange={onSetTaskTitle} value={taskTitle}/>
            <button onClick={onClickHandler}>set task title</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);

    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [updateTaskTitle, setUpdateTaskTitle] = useState<string>('');

    const onSetTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const onSetTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value);
    }

    const onSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTaskTitle(e.currentTarget.value);
    }

    const onClickHandler = () => {
        const model = {
            title: updateTaskTitle,
            description: '',
            completed: false,
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
        };

        todolistAPI.updateTask(todolistId, taskId, model).then(res => setState(res.data));
        setTodolistId('');
        setTaskId('');
        setUpdateTaskTitle('');
    }

    return (
        <div>
            <input type="text" placeholder={'todolistId'} onChange={onSetTodolistId} value={todolistId}/>
            <input type="text" placeholder={'taskId'} onChange={onSetTaskId} value={taskId}/>
            <input type="text" placeholder={'update task title'} onChange={onSetTaskTitle} value={updateTaskTitle}/>
            <button onClick={onClickHandler}>update task title</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);

    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId).then(res => setState(res.data));
    }

    const setTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    }

    const setTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value);
    }

    return (
        <div>
            <div>
                <input type="text" placeholder={'todolistId'} onChange={setTodolistIdHandler}/>
                <input type="text" placeholder={'taskId'} onChange={setTaskIdHandler}/>
                <button onClick={deleteTask}>delete task</button>
            </div>
            {JSON.stringify(state)}
        </div>
    );
}
