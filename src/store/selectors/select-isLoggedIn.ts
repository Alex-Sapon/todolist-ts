import {RootStateType} from '../store';

export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn;