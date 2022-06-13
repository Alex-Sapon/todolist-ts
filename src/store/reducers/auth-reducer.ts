import {LoginParametersType} from '../../api/todolist-api';

type InitialStateType = {

}

export const authReducer = (state: InitialStateType = {}, action: AuthActionsType): InitialStateType => {
    switch(action.type) {
        case 'AUTH/SET-LOGIN':
            return {...state, }
        default:
            return state;
    }
}

export const login = (data: LoginParametersType) => ({
    type: 'AUTH/SET-LOGIN',
    payload: {
        data,
    },
} as const);

export type AuthActionsType = ReturnType<typeof login>