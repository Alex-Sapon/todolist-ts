import React, {FC, useCallback} from 'react';
import {TodoList} from './components/TodoList/TodoList';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from './store/todolists-reducer';
import {useAppDispatch, useAppSelector} from './store/hooks';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListsType = {
    id: string
    title: string
    filter: ValueFilterType
}

export type ValueFilterType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const todoLists = useAppSelector(state => state.todoLists);

    const changeFilter = useCallback((todoListId: string, filter: ValueFilterType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }, [dispatch]);
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }, [dispatch]);

    return (
        <div style={{height: ' 100vh'}}>
            <Box sx={{flexGrow: 1, mb: '2rem'}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Menu</Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container sx={{mb: '2rem'}} fixed>
                <AddItemForm title={'Add todo list'} addItem={addTodoList}/>
                <Grid container spacing={3} columns={12}>
                    {todoLists.length === 0 &&
                        <Grid item xs={12} md={12} sm={12} lg={12}>
                            <Typography sx={{textAlign: 'center', mt: '2rem'}} variant={'h5'}>Add
                                TodoList.</Typography>
                        </Grid>}
                    {todoLists.map(todo =>
                        <Grid item xs={12} md={6} sm={12} lg={4}>
                            <TodoList
                                todoListId={todo.id}
                                title={todo.title}
                                filterTasks={changeFilter}
                                filter={todo.filter}
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodoListTitle}
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};