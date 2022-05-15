import React from 'react';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {App} from './App';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)
