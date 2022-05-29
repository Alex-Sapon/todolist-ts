import React from 'react';
import {Container} from '@mui/material';
import {AppBarComponent} from '../components/AppBar/AppBar';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';

export const App = () => {
    return (
        <div style={{height: ' 100vh'}}>
            <AppBarComponent/>
            <Container sx={{mb: '2rem'}} fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
};