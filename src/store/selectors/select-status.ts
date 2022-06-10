import { RequestStatusType } from '../reducers/app-reducer';
import {RootStateType} from '../store';

export const selectStatus = (state: RootStateType): RequestStatusType => state.app.status;