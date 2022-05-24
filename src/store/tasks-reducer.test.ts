import {v1} from 'uuid';
import {
    addTaskAC,
    changeStatusAC,
    changeValueTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';
import {addTodoListAC, removeTodoListAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let todoListId1: string;
let todoListId2: string;

let startState: TasksStateType;

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = ({
        [todoListId1]: [
            {
                id: '1',
                title: 'HTML&CSS',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
            {
                id: '2',
                title: 'JavaScript/ES6',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
            {
                id: '3',
                title: 'React',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
            {
                id: '4',
                title: 'TypeScript',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',

            },
            {
                id: '5',
                title: 'Redux',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',

            },
            {
                id: '6',
                title: 'Rest API',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
        ],
        [todoListId2]: [
            {
                id: '1',
                title: 'Book',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
            {
                id: '2',
                title: 'Milk',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
            {
                id: '3',
                title: 'Phone',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
        ]
    });
});

test('correct task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC(todoListId1, 'Git'))

    expect(startState[todoListId1].length).toBe(6);
    expect(endState[todoListId1][0].title).toBe('Git');
    expect(endState[todoListId1].length).toBe(7);

});

test('task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC(todoListId1, '6'))

    expect(startState[todoListId1].length).toBe(6);
    expect(endState[todoListId1].length).toBe(5);
});

test('status of task should be changed', () => {
    const endState = tasksReducer(startState, changeStatusAC(todoListId2, '2', TaskStatuses.Completed))

    expect(startState[todoListId2][1].status).toBe(TaskStatuses.New);
    expect(endState[todoListId2][1].status).toBe(TaskStatuses.Completed);
})

test('title of task should be changed', () => {
    const endState = tasksReducer(startState, changeValueTaskAC(todoListId2, '3','Honey'));

    expect(startState[todoListId2][2].title).toBe('Phone');
    expect(endState[todoListId2][2].title).toBe('Honey');
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodoListAC('New TodoList'))

    const keys = Object.keys(endState);
    const newKey = keys.find(i => i !== todoListId1 && i !== todoListId2);

    if (!newKey) throw Error('new key not find');

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodoListAC(todoListId2))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId2]).toBeUndefined()
})