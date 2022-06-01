import {RootStateType} from '../../app/store';
import { TodoListsDomainType } from '../reducers/todolists-reducer';

export const selectTodoLists = (state: RootStateType): TodoListsDomainType[] => state.todoLists;