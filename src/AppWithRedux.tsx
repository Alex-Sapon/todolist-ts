import React, {useReducer, useState} from 'react';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeStatusAC, changeValueTaskAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch} from 'react-redux';

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

    export const todoListId1 = v1()
    export const todoListId2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript/ES6', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Phone', isDone: false}
        ]
    })

    const removeTask = (todoListId: string, id: string) => {
        dispatchTasks(removeTaskAC(todoListId, id))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchTasks(addTaskAC(todoListId, title))
    }

    const changeStatus = (todoListId: string, isDone: boolean, id: string) => {
        dispatchTasks(changeStatusAC(todoListId, isDone, id))
    }

    const changeValueTask = (todoListId: string, title: string, id: string) => {
        dispatchTasks(changeValueTaskAC(todoListId, title, id))
    }

    const changeFilter = (todoListId: string, filter: ValueFilterType) => {
        dispatchTodoLists(changeTodoListFilterAC(todoListId, filter))
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchTasks(action)
        dispatchTodoLists(action)
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatchTodoLists(changeTodoListTitleAC(todoListId, title))
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