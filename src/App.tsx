import React, {useCallback} from 'react';
import {TodoList} from './components/TodoList/TodoList';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector, useDispatch} from 'react-redux';
import {RootStateType} from './state/store';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from './state/todolists-reducer';

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

export const App = () => {
    console.log('App')
    const dispatch = useDispatch()
    const todoLists = useSelector<RootStateType, Array<TodoListsType>>(state => state.todoLists)

    const changeFilter = useCallback((todoListId: string, filter: ValueFilterType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }, [dispatch])

    return (
        <div>
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
                <AddItemForm title={'Add todo'} addItem={addTodoList}/>
                <Grid container spacing={3} columns={12}>
                    {todoLists.length === 0 &&
                        <Grid item xs={12} md={12} sm={12} lg={12}>
                            <Typography sx={{textAlign: 'center', mt: '2rem'}} variant={'h5'}>Add TodoList.</Typography>
                        </Grid>}

                    {todoLists.map(todo => {
                        return (
                            <Grid key={todo.id} item xs={12} md={6} sm={12} lg={4}>
                                <TodoList
                                    todoListId={todo.id}
                                    title={todo.title}
                                    filterTasks={changeFilter}
                                    filter={todo.filter}
                                    removeTodoList={removeTodoList}
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


// import {TodoList} from './components/TodoList/TodoList';
// import {v1} from 'uuid';
// import {AddItemForm} from './components/AddItemForm/AddItemForm';
// import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

// export type TodoListsType = {
//     id: string
//     title: string
//     filter: ValueFilterType
// }

// export type ValueFilterType = 'all' | 'active' | 'completed';

// export type TasksStateType = {
//     [key: string]: TaskType[]
// }

// const App = () => {
//     const todoListId1 = v1()
//     const todoListId2 = v1()

//     const [todoLists, setTodoLists] = useState<TodoListsType[]>([
//         {id: todoListId1, title: 'What to learn', filter: 'all'},
//         {id: todoListId2, title: 'What to buy', filter: 'all'}
//     ])

//     const [tasks, setTasks] = useState<TasksStateType>({
//         [todoListId1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JavaScript/ES6', isDone: true},
//             {id: v1(), title: 'React', isDone: false},
//             {id: v1(), title: 'TypeScript', isDone: false},
//             {id: v1(), title: 'Redux', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoListId2]: [
//             {id: v1(), title: 'Book', isDone: true},
//             {id: v1(), title: 'Milk', isDone: false},
//             {id: v1(), title: 'Phone', isDone: false}
//         ]
//     })

//     const removeTask = (todoListId: string, id: string) => {
//         setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
//     }

//     const addTask = (todoListId: string, title: string) => {
//         setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
//     }

//     const changeStatus = (todoListId: string, isDone: boolean, id: string) => {
//         setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, isDone} : task)})
//     }

//     const changeValueTask = (todoListId: string, title: string, id: string) => {
//         setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, title} : task)})
//     }

//     const changeFilter = (todoListId: string, filter: ValueFilterType) => {
//         setTodoLists(todoLists.map(todo => todo.id === todoListId ? {...todo, filter} : todo))
//     }

//     const removeTodoList = (todoListId: string) => {
//         setTodoLists(todoLists.filter(todo => todo.id !== todoListId))
//         delete tasks[todoListId]
//         setTasks({...tasks})
//     }

//     const addTodoList = (title: string) => {
//         const newTodoList: TodoListsType = {id: v1(), title, filter: 'all'}
//         setTodoLists([newTodoList, ...todoLists])
//         setTasks({[newTodoList.id]: [], ...tasks})
//     }

//     const changeTodoListTitle = (todoListId: string, title: string) => {
//         setTodoLists(todoLists.map(todo => todo.id === todoListId ? {...todo, title} : todo))
//     }

//     return (
//         <div>
//             <Box sx={{ flexGrow: 1 , mb: '2rem'}}>
//                 <AppBar position="static">
//                     <Toolbar>
//                         <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Menu</Typography>
//                         <Button color="inherit">Login</Button>
//                     </Toolbar>
//                 </AppBar>
//             </Box>
//             <Container sx={{mb: '2rem'}} fixed>
//                 <AddItemForm title={'Add todo'} addItem={addTodoList}/>
//                 <Grid container spacing={3} columns={12}>
//                     {todoLists.length === 0 &&
//                     <Grid item xs={12} md={12} sm={12} lg={12}>
//                         <Typography sx={{textAlign: 'center', mt: '2rem'}} variant={'h5'}>Why did you delete everything TodoLists???</Typography>
//                     </Grid>}

//                     {todoLists.map(todo => {
//                         let setTodoListTasks;
//                         switch (todo.filter) {
//                             case 'active':
//                                 setTodoListTasks = tasks[todo.id].filter(task => !task.isDone);
//                                 break;
//                             case 'completed':
//                                 setTodoListTasks = tasks[todo.id].filter(task => task.isDone);
//                                 break;
//                             default:
//                                 setTodoListTasks = tasks[todo.id];
//                                 break;
//                         }

//                         return (
//                             <Grid key={todo.id} item xs={12} md={6} sm={12} lg={4}>
//                                 <TodoList
//                                     todoListId={todo.id}
//                                     title={todo.title}
//                                     tasks={setTodoListTasks}
//                                     removeTask={removeTask}
//                                     filterTasks={changeFilter}
//                                     addTask={addTask}
//                                     isChecked={changeStatus}
//                                     filter={todo.filter}
//                                     removeTodoList={removeTodoList}
//                                     addTodoList={addTodoList}
//                                     changeValueTask={changeValueTask}
//                                     changeTodoListTitle={changeTodoListTitle}
//                                 />
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>

//         </div>
//     );
// }