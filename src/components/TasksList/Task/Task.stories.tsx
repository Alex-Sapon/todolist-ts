import {Task} from './Task';
import {ComponentMeta, Story} from '@storybook/react';
import React from 'react';
import {ReduxStoreProviderDecorator} from '../../../stories/ReduxStoreProviderDecorator';
import {TaskType} from '../../../App';

export default {
    title: 'component/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>

type TaskPropsType = {
    task: TaskType[]
    todoListID: string
}

const Template: Story<TaskPropsType> = (args) => {
    return (
        <div>
            {args.task.map(task => <Task key={task.id} task={task} todoListID={args.todoListID}/>)}
        </div>
    )
}

export const TaskHTML = Template.bind({});

TaskHTML.args = {
    task: [
        {
            id: '1',
            title: 'HTML',
            isDone: true
        },
        {
            id: '2',
            title: 'JS',
            isDone: false
        }
    ],
    todoListID: 'todoListId1',
}
