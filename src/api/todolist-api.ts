import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'a9cefb86-ff4d-4ca7-940a-48de73511e4e',
    },
});

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
};