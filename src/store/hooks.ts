import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootActionsType, RootStateType} from './store';
import {ThunkDispatch} from 'redux-thunk';

// typing hooks
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootStateType, unknown, RootActionsType>>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

