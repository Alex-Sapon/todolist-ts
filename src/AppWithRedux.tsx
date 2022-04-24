import React from 'react';
import {TodoList} from './components/TodoList/TodoList';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './state/todolists-reducer';
import {addTaskAC, changeStatusAC, changeValueTaskAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './state/store';

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

export const AppWithRedux = () => {
    const dispatch = useDispatch()

    const todoLists = useSelector<RootStateType, TodoListsType[]>(state => state.todoLists)
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)

    const removeTask = (todoListId: string, id: string) => {
        dispatch(removeTaskAC(todoListId, id))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }

    const changeStatus = (todoListId: string, isDone: boolean, id: string) => {
        dispatch(changeStatusAC(todoListId, isDone, id))
    }

    const changeValueTask = (todoListId: string, title: string, id: string) => {
        dispatch(changeValueTaskAC(todoListId, title, id))
    }

    const changeFilter = (todoListId: string, filter: ValueFilterType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 , mb: '2rem'}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Menu</Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container sx={{mb: '2rem'}} fixed>
                <AddItemForm title={'Add todo'} addItem={addTodoList}/>
                <Grid container spacing={3} columns={12}>
                    {todoLists.length === 0 && 
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Typography sx={{textAlign: 'center', mt: '2rem'}} variant={'h5'}>Why did you delete everything TodoLists???</Typography>
                    </Grid>}

                    {todoLists.map(todo => {
                        let setTodoListTasks: TaskType[] = tasks[todo.id];
                        switch (todo.filter) {
                            case 'active':
                                setTodoListTasks = tasks[todo.id].filter(task => !task.isDone);
                                break;
                            case 'completed':
                                setTodoListTasks = tasks[todo.id].filter(task => task.isDone);
                                break;
                        }

                        return (
                            <Grid key={todo.id} item xs={12} md={6} sm={12} lg={4}>
                                <TodoList
                                    todoListId={todo.id}
                                    title={todo.title}
                                    tasks={setTodoListTasks}
                                    removeTask={removeTask}
                                    filterTasks={changeFilter}
                                    addTask={addTask}
                                    isChecked={changeStatus}
                                    filter={todo.filter}
                                    removeTodoList={removeTodoList}
                                    addTodoList={addTodoList}
                                    changeValueTask={changeValueTask}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
          
        </div>
    );
}