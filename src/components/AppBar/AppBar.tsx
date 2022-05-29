import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

export const AppBarComponent = () => {
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
            </AppBar>
        </Box>
    )
};