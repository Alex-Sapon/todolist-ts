import {addTask, changeTaskEntityStatus, fetchTasks, removeTask, TasksStateType, updateTask} from './tasks-reducer';
import {tasksReducer, todoListsActions, TodoListsDomainType} from './';
import {TaskPriority, TaskStatus, TaskType} from '../../api/todolist-api';

let startState: TasksStateType;
let newTodoList: TodoListsDomainType;

beforeEach(() => {
    startState = ({
        ['todoListId1']: [
            {
                id: '1',
                title: 'HTML&CSS',
                description: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '2',
                title: 'JavaScript/ES6',
                description: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '3',
                title: 'React',
                description: '',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '4',
                title: 'TypeScript',
                description: '',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',

            },
            {
                id: '5',
                title: 'Redux',
                description: '',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '6',
                title: 'Rest API',
                description: '',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
        ],
        ['todoListId2']: [
            {
                id: '1',
                title: 'Book',
                description: '',
                status: TaskStatus.Completed,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '2',
                title: 'Milk',
                description: '',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '3',
                title: 'Phone',
                description: '',
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todoListId1',
                order: 0,
                addedDate: '',
                entityStatus: 'idle',
            },
        ]
    });

    newTodoList = {
        id: 'todoListId3',
        title: 'newTodoList',
        filter: 'all',
        addedDate: '',
        order: 0,
        entityStatus: 'idle'
    };
});

test('correct task should be added', () => {
    const task: TaskType = {
        id: '1',
        title: 'Git',
        description: '',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todoListId1',
        order: 0,
        addedDate: '',
    }

    const endState = tasksReducer(startState, addTask.fulfilled(task, 'requestId', {
        todoListId: 'todoListId1',
        title: 'Git'
    }))

    expect(startState['todoListId1'].length).toBe(6);
    expect(endState['todoListId1'][0].title).toBe('Git');
    expect(endState['todoListId1'].length).toBe(7);
});

test('task should be removed', () => {
    const params = {todoListId: 'todoListId1', taskId: '6'};

    const endState = tasksReducer(startState, removeTask.fulfilled(params, 'requestId', params));

    expect(startState['todoListId1'].length).toBe(6);
    expect(endState['todoListId1'].length).toBe(5);
});

test('status of task should be changed', () => {
    const params = {
        todoListId: 'todoListId2',
        taskId: '2',
        task: {
            status: TaskStatus.Completed,
        }
    }

    const endState = tasksReducer(startState, updateTask.fulfilled(params, 'requestId', params));

    expect(startState['todoListId2'][1].status).toBe(TaskStatus.New);
    expect(endState['todoListId2'][1].status).toBe(TaskStatus.Completed);
})

test('title of task should be changed', () => {
    const params = {
        todoListId: 'todoListId2',
        taskId: '3',
        task: {
            title: 'Honey'
        }
    }

    const endState = tasksReducer(startState, updateTask.fulfilled(params, 'requestId', params));

    expect(startState['todoListId2'][2].title).toBe('Phone');
    expect(endState['todoListId2'][2].title).toBe('Honey');
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, todoListsActions.addTodoList.fulfilled(newTodoList, 'requestId', newTodoList.title));

    const keys = Object.keys(endState);
    const newKey = keys.find(i => i !== 'todoListId1' && i !== 'todoListId2');

    if (!newKey) throw Error('new key not found');

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, todoListsActions.removeTodoList.fulfilled('todoListId2', 'requestId', 'todoListId2'));
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListId2']).toBeUndefined();
})

test('tasks should be added for todoList', () => {
    const params = {todoListId: 'todoListId1', tasks: startState['todoListId1']};

    const action = fetchTasks.fulfilled(params, 'requestId', 'todoListId1');

    const endState = tasksReducer({'todoListId2': [], 'todoListId1': []}, action);

    expect(endState['todoListId1'].length).toBe(6);
    expect(endState['todoListId2'].length).toBe(0);
})

test('entity status for task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskEntityStatus({
        todoListId: 'todoListId1',
        taskId: '6',
        status: 'succeeded'
    }));

    expect(endState['todoListId1'][5].entityStatus).toBe('succeeded');
})