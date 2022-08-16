import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {RootStateType} from '../../app/store';
import {useAppSelector, useAppDispatch} from '../../utils/hooks';
import {logout} from '../Login/auth-reducer';

const selectorStatus = (state: RootStateType) => state.app.status;

export const AppBarComponent = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectorStatus);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <Box sx={{flexGrow: 1, mb: '2rem'}}>
            <AppBar position="static" style={{backgroundColor: '#045256'}}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Menu</Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' &&
                    <LinearProgress color="inherit" sx={{position: 'absolute', top: '60px', width: '100%'}}/>}
            </AppBar>
        </Box>
    )
};