import {Task} from './Task';
import {Story} from '@storybook/react';
import React from 'react';
import {ReduxStoreProviderDecorator} from '../../../stories/decorators/ReduxStoreProviderDecorator';
import {TaskType} from '../../../App';
import {action} from '@storybook/addon-actions';
import {Meta} from '@storybook/react/types-6-0';

export default {
    title: 'TodoList/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

type TaskPropsType = {
    task: TaskType
    todoListID: string
    changeTaskStatus: () => void
    changeTaskTitle: () => void
    removeTask: () => void
}

const changeTaskStatusCallback = action('Status changed inside Task');
const changeTaskTitleCallback = action('Title changed inside Task');
const removeTaskCallback = action('Remove task inside Task clicked');

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>;

export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'HTML', isDone: true},
    todoListID: 'todoListId1',
};
