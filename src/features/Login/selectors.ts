import {RootStateType} from '../../app/store';

export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn;
export const selectCaptchaUrl = (state: RootStateType) => state.auth.captchaUrl;