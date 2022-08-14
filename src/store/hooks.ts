import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootStateType} from './store';

// export const useAppDispatch = () => useDispatch<ThunkDispatch<RootStateType, unknown, RootActionsType>>();
// export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

