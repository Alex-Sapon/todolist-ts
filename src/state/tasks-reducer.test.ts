import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTaskAC, changeStatusAC, changeValueTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodoListAC, removeTodoListAC} from './todolists-reducer';
import {throws} from 'assert';

test('correct task should be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = ({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript/ES6', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Phone', isDone: false}
        ]
    })

    const endState = tasksReducer(startState, addTaskAC(todoListId1, 'Git'))

    expect(startState[todoListId1].length).toBe(6)
    expect(endState[todoListId1][0].title).toBe('Git')
    expect(endState[todoListId1].length).toBe(7)

})

test('task should be removed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = ({
        [todoListId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JavaScript/ES6', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'TypeScript', isDone: false},
            {id: '5', title: 'Redux', isDone: false},
            {id: '6', title: 'Rest API', isDone: false}
        ],
        [todoListId2]: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Phone', isDone: false}
        ]
    })

    const endState = tasksReducer(startState, removeTaskAC(todoListId1, '6'))

    expect(startState[todoListId1].length).toBe(6)
    expect(endState[todoListId1].length).toBe(5)
})

test('status of task should be changed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = ({
        [todoListId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JavaScript/ES6', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'TypeScript', isDone: false},
            {id: '5', title: 'Redux', isDone: false},
            {id: '6', title: 'Rest API', isDone: false}
        ],
        [todoListId2]: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Phone', isDone: false}
        ]
    })

    const endState = tasksReducer(startState, changeStatusAC(todoListId2, true, '2'))

    expect(startState[todoListId2][1].isDone).toBeFalsy()
    expect(endState[todoListId2][1].isDone).toBeTruthy()
})

test('title of task should be changed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = ({
        [todoListId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JavaScript/ES6', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'TypeScript', isDone: false},
            {id: '5', title: 'Redux', isDone: false},
            {id: '6', title: 'Rest API', isDone: false}
        ],
        [todoListId2]: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Phone', isDone: false}
        ]
    })

    const endState = tasksReducer(startState, changeValueTaskAC(todoListId2, 'Honey', '3'))

    expect(startState[todoListId2][2].title).toBe('Phone')
    expect(endState[todoListId2][2].title).toBe('Honey')
})

test('new array should be added when new todolist is added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = ({
        [todoListId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JavaScript/ES6', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'TypeScript', isDone: false},
            {id: '5', title: 'Redux', isDone: false},
            {id: '6', title: 'Rest API', isDone: false}
        ],
        [todoListId2]: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Phone', isDone: false}
        ]
    })

    const endState = tasksReducer(startState, addTodoListAC('New TodoList'))

    const keys = Object.keys(endState)
    const newKey = keys.find(i => i !== todoListId1 && i !== todoListId2)

    if (!newKey) throw Error('new key not find')

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
        [todoListId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JavaScript/ES6', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        [todoListId2]: [
            {id: '1', title: 'Book', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Phone', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, removeTodoListAC(todoListId2))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId2]).toBeUndefined()
})