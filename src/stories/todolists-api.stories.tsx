import React, {ChangeEvent, useEffect, useState} from 'react';
import {todolistAPI, TodolistType} from '../api/todolist-api';

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
            {state.map(i => {
                return (
                    <div>
                        <div>title: {i.title}</div>
                        <div>id: {i.id}</div>
                        <div>order: {i.order}</div>
                        <div>addedDate: {i.addedDate}</div>
                        <br/>
                    </div>
                )
            })}
        </div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistAPI.createTodolist('New new todolist').then(res => setState(res.data));

    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '89b4b4b0-da6f-4a30-84bc-c5ee5f99b920';
        todolistAPI.deleteTodolist(todolistId).then(res => setState(res.data));

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '0881034e-a21e-4e10-ad50-a88020ea1245';
        const newTitle = 'New !!!!!!!!';
        todolistAPI.updateTodolistTitle(todolistId, newTitle).then(res => setState(res.data));
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '0881034e-a21e-4e10-ad50-a88020ea1245';

        todolistAPI.getTasks(todolistId).then(res => {
            setState(res.data.items);
        })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const SetTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '05a01240-e4aa-4d6d-8c4f-9bf0651f0392';
        const newTaskTitle = 'TypeScript';

        todolistAPI.setTask(todolistId, newTaskTitle).then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '0881034e-a21e-4e10-ad50-a88020ea1245';
        const taskId = '4d2b1efe-4c93-4c3b-9096-55dcde5a0578';
        const newTaskTitle = {
            title: 'Toolkit',
            description: '',
            completed: false,
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
        };

        todolistAPI.updateTask(todolistId, taskId, newTaskTitle).then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>
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

// 0881034e-a21e-4e10-ad50-a88020ea1245

