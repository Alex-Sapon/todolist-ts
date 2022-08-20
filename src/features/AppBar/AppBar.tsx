import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useActions, useAppSelector} from '../../utils/hooks';
import {asyncAuthActions, authSelectors} from '../Login';
import {appSelectors} from '../../app';

export const AppBarComponent = () => {
    const {logout} = useActions(asyncAuthActions);

    const status = useAppSelector(appSelectors.selectStatus);
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn);

    return (
        <Box sx={{flexGrow: 1, mb: '2rem'}}>
            <AppBar position="static" style={{backgroundColor: '#045256'}}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Menu</Typography>
                    {isLoggedIn && <Button color="inherit" onClick={() => logout()}>Log out</Button>}
                </Toolbar>
                {status === 'loading' &&
                    <LinearProgress color="inherit" sx={{position: 'absolute', top: '60px', width: '100%'}}/>}
            </AppBar>
        </Box>
    )
};