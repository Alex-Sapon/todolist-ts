import React from 'react';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {App} from './app';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));