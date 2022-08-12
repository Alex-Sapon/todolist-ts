import {appReducer, InitialStateType, setAppErrorMessage, setAppStatus} from '../app-reducer';

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        errorMessage: null,
        isInitialized: false,
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorMessage({error: 'Error'}));

    expect(endState.errorMessage).toBe('Error');
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}));

    expect(endState.status).toBe('loading');
})