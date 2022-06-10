const initialState: InitialStateType = {
    status: 'idle',
    errorMessage: null,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR-MESSAGE':
            return {...state, errorMessage: action.payload.errorMessage}
        default:
            return state;
    }
}

// actions
export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status,
    }
} as const);

export const setAppErrorMessage = (errorMessage: string | null) => ({
    type: 'APP/SET-ERROR-MESSAGE',
    payload: {
        errorMessage,
    }
} as const);

// types
export type AppActionsType = 
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorMessage>;

type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';