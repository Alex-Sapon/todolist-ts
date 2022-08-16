import {RootStateType} from './store';
import {RequestStatusType} from './app-reducer';

export const selectIsInitialized = (state: RootStateType) => state.app.isInitialized;
export const selectStatus = (state: RootStateType): RequestStatusType => state.app.status;