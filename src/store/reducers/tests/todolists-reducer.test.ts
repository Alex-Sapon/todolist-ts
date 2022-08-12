import {
    changeTodoListEntityStatus,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    deleteTodolist, setTodoList,
    setTodoLists,
    TodoListsDomainType,
    todoListsReducer
} from '../todolists-reducer';
import {ValueFilterType} from '../../../api/todolist-api';

let startState: TodoListsDomainType[];
let newTodoList: TodoListsDomainType;

let newTodolistTitle: string;

let newFilter: ValueFilterType;

beforeEach(() => {
    newTodolistTitle = 'newTodoList';

    newFilter = 'completed';

    startState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ];

    newTodoList = {
        id: 'todolistId3',
        title: 'newTodoList',
        filter: 'all',
        addedDate: '',
        order: 0,
        entityStatus: 'idle',
    };
});

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, deleteTodolist({todoListId: 'todolistId1'}));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe('todolistId2');
});

test('correct todolist should be added', () => {
    const endState = todoListsReducer(startState, setTodoList({todoList: newTodoList}));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    const endState = todoListsReducer(startState, changeTodoListTitleAC({
        todoListId: 'todolistId2',
        title: newTodolistTitle,
    }));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    const endState = todoListsReducer(startState, changeTodoListFilterAC({
        todoListId: 'todolistId2',
        filter: newFilter,
    }));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolist should be set', () => {
    const endState = todoListsReducer([], setTodoLists({todoLists: startState}));

    expect(endState.length).toBe(2);
});

test('entity status of todolist should be changed', () => {
    const endState = todoListsReducer(startState, changeTodoListEntityStatus({
        todoListId: 'todolistId2',
        status: 'failed',
    }));

    expect(endState[1].entityStatus).toBe('failed');
});