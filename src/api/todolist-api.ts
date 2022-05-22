import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'a9cefb86-ff4d-4ca7-940a-48de73511e4e',
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
})

export const todolistAPI = {
    getTodolists() {
        return instance.get('todo-lists', settings);
    },
    createTodolist(title: string) {
        return instance.post('todo-lists', {title: title}, settings);
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`, settings);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title: title}, settings);
    },
};