import React, {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data));

    }, []);

    return <div>{JSON.stringify(state)}</div>
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

