import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTaskAC, tasksReducer} from './tasks-reducer';

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

    expect(endState[todoListId1][0].title).toBe('Git')
    expect(endState[todoListId1].length).toBe(7)

})