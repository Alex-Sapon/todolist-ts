import {AddItemForm, AddItemFormType} from './AddItemForm';
import {Story, Meta} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import React from 'react';

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked',
        }
    },
} as Meta;

const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args}/>;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    title: 'New title',
    addItem: action('Button inside form clicked'),
};