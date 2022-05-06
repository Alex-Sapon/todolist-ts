import {TasksStateType, TodoListsType} from '../App';
import {addTodoListAC, todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {};
    const startTodoListsState: Array<TodoListsType> = [];

    const action = addTodoListAC('New TodoLIst');

    const endTasksState = tasksReducer(startTaskState, action);
    const endTodoListState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoList = endTodoListState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodoList).toBe(action.id);
});