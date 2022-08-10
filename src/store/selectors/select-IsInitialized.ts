import {RootStateType} from '../store';

export const selectIsInitialized = (state: RootStateType) => state.app.isInitialized;