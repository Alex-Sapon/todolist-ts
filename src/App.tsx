import React, {useState} from 'react';
import styles from './App.module.css';
import {TodoList} from './components/TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Menu, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListsProps = {
    id: string
    title: string
    filter: ValueFilterType
}

export type ValueFilterType = 'all' | 'active' | 'completed';

type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListsProps[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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

    const changeFilter = (todoListId: string, title: ValueFilterType,) => {
        setTodoLists(todoLists.map(todo => todo.id === todoListId ? {...todo, filter: title} : todo))
    };

    const removeTask = (todoListId: string, id: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
    }

    const addTask = (todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
    }

    const changeStatus = (todoListId: string, isDone: boolean, id: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, isDone} : task)})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const newTodoList: TodoListsProps = {id: v1(), title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({[newTodoList.id]: [], ...tasks})
    }

    const changeValueTask = (todoListId: string, title: string, id: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, title} : task)})
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(todo => todo.id === todoListId ? {...todo, title} : todo))
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 , mb: '2rem'}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>News</Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container sx={{mb: '2rem'}} fixed>
                <AddItemForm title={'Add todo'} addItem={addTodoList}/>
                <Grid container spacing={3}>
                    {todoLists.length === 0 && <div>Why did you delete everything TodoLists???</div>}

                    {todoLists.map(todo => {
                        let setTodoListTasks;
                        switch (todo.filter) {
                            case 'active':
                                setTodoListTasks = tasks[todo.id].filter(task => !task.isDone);
                                break;
                            case 'completed':
                                setTodoListTasks = tasks[todo.id].filter(task => task.isDone);
                                break;
                            default:
                                setTodoListTasks = tasks[todo.id];
                                break;
                        }

                        return (
                            <Grid item xs={4}>
                                <TodoList
                                    key={todo.id}
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