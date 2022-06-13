import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {RootStateType} from '../../store/store';
import {useAppSelector} from '../../store/hooks';

const selectorStatus = (state: RootStateType) => state.app.status; 

export const AppBarComponent = () => {
    const status = useAppSelector(selectorStatus);

    return (
        <Box sx={{flexGrow: 1, mb: '2rem'}}>
            <AppBar position="static" style={{backgroundColor: '#045256'}}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Menu</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="inherit" sx={{position: 'absolute', top: '60px', width: '100%'}}/>}
            </AppBar>
        </Box>
    )
};