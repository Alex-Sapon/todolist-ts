import {EditableSpan, EditableSpanType} from './EditableSpan';
import {Meta} from '@storybook/react/types-6-0';
import {Story} from '@storybook/react';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        onClick: {
            description: 'Value EditableSpan changed',
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan',
        }
    },
} as Meta;

const Template: Story<EditableSpanType> = (args) => <EditableSpan {...args}/>;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title: 'HTML',
    changeValue: action('Value EditableSpan changed')
}