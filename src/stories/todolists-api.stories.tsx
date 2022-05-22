import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'a9cefb86-ff4d-4ca7-940a-48de73511e4e'
    }
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
        const todolistId = '4c6cf726-6a91-487b-bd72-3726e8d2d1dc';
        todolistAPI.deleteTodolist(todolistId).then(res => setState(res.data));

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0881034e-a21e-4e10-ad50-a88020ea1245';
        const newTitle = 'New !!!!!!!!';
        todolistAPI.updateTodolistTitle(todolistId, newTitle).then(res => setState(res.data));
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

