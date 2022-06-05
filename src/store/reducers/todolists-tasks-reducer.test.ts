import {addTodoListAC, TodoListsDomainType, todoListsReducer} from './todolists-reducer';
import {tasksReducer, TasksStateType} from './tasks-reducer';
import {v1} from 'uuid';

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {};
    const startTodoListsState: TodoListsDomainType[] = [];

    const action = addTodoListAC({id: v1(), title: 'newTodoList', addedDate: '', order: 0});

    const endTasksState = tasksReducer(startTaskState, action);
    const endTodoListState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoList = endTodoListState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoList).toBe(action.payload.todoList.id);
});