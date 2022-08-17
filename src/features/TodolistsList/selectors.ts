import {RootStateType} from '../../app/store';
import {TodoListsDomainType} from './todolists-reducer';

export const selectTodoLists = (state: RootStateType): TodoListsDomainType[] => state.todoLists;
export const selectTasks = (todoListId: string) => (state: RootStateType) => state.tasks[todoListId];