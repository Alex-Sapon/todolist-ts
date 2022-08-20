import {todoListsReducer, TodoListsDomainType, todoListsActions, tasksReducer, TasksStateType} from './';
import {v1} from 'uuid';

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {};
    const startTodoListsState: TodoListsDomainType[] = [];

    const params = {id: v1(), title: 'newTodoList', addedDate: '', order: 0}

    const action = todoListsActions.addTodoList.fulfilled(params, 'requestId', params.title);

    const endTasksState = tasksReducer(startTaskState, action);
    const endTodoListState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoList = endTodoListState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodoList).toBe(action.payload.id);
});