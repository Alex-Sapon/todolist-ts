import React from 'react';
import {App} from './App';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';
import {Meta, Story} from '@storybook/react/types-6-0';

export default {
    title: 'TodoList/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = (args) => <App {...args}/>;

export const AppBaseExample = Template.bind({});

AppBaseExample.args = {};