import {appReducer, InitialStateType, setAppErrorMessage, setAppStatus} from './app-reducer';

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        errorMessage: null,
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorMessage('Error'));

    expect(endState.errorMessage).toBe('Error');
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus('loading'));

    expect(endState.status).toBe('loading');
})