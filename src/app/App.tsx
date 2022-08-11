import {Box, CircularProgress, Container} from '@mui/material';
import {AppBarComponent} from '../features/AppBar/AppBar';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {initializeApp} from '../store/reducers/app-reducer';
import {useEffect} from 'react';
import {selectIsInitialized} from '../store/selectors/select-IsInitialized';

type AppType = {
    demo?: boolean
}

export const App = ({demo = false}: AppType) => {
    const dispatch = useAppDispatch();

    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30%'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <div style={{height: '100vh'}}>
            <ErrorSnackbar/>
            <AppBarComponent/>
            <Container sx={{mb: '2rem'}} fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404"
                           element={<h1 style={{display: 'flex', justifyContent: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    )
};