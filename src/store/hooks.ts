import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootStateType} from './store';
import {ThunkDispatch} from 'redux-thunk';
import {TodoListActionsType} from './reducers/todolists-reducer';
import {TasksActionType} from './reducers/tasks-reducer';

// actions
type AppActionsType = TodoListActionsType | TasksActionType;

// typing hooks
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootStateType, unknown, AppActionsType> & AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

