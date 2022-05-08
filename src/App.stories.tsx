import React from 'react';
import {App} from './App';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';
import {Story} from '@storybook/react';

export default {
    title: 'component/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
}

const Template: Story<{}> = (args) => <App/>

export const AppExample = Template.bind({});

AppExample.args = {};