import React from 'react';
import {Container} from '@mui/material';
import {AppBarComponent} from '../components/AppBar/AppBar';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';

type AppType = {
    demo?: boolean
}

export const App = ({demo = false}: AppType) => {
    return (
        <div style={{height: '100vh'}}>
            <ErrorSnackbar/>
            <AppBarComponent/>
            <Container sx={{mb: '2rem'}} fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    )
};