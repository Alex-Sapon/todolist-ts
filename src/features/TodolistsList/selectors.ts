import {RootStateType} from '../../app/store';
import {TodoListsDomainType} from './todolists-reducer';

export const selectTodoLists = (state: RootStateType): TodoListsDomainType[] => state.todoLists;