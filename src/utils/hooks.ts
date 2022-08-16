import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootStateType} from '../app/store';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useMemo} from 'react';

// export const useAppDispatch = () => useDispatch<ThunkDispatch<RootStateType, unknown, RootActionsType>>();
// export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch();

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [actions, dispatch])

    return boundActions;
}

