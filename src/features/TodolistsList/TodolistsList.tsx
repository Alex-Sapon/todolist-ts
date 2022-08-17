import {Grid, Typography} from '@mui/material';
import {selectTodoLists, TodoList, todoListsActions} from './';
import {useCallback, useEffect} from 'react';
import {useActions, useAppSelector} from '../../utils/hooks';
import {AddItemForm} from '../../components/AddItemForm/';
import {Navigate} from 'react-router';
import {authSelectors} from '../Login';

type TodolistsListType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: TodolistsListType) => {
    const todoLists = useAppSelector(selectTodoLists);
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn);

    const {addTodoList, fetchTodoLists} = useActions(todoListsActions);

    const addTodoListHandler = useCallback((title: string) => {
        addTodoList(title);
    }, [addTodoList])

    useEffect(() => {
        if (demo || !isLoggedIn) return;

        fetchTodoLists();
    }, [demo, isLoggedIn, fetchTodoLists]);

    if (!isLoggedIn) return <Navigate to="/login"/>

    if (!todoLists.length) {
        return (
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Typography sx={{textAlign: 'center', mt: '2rem'}} variant="h5">Add todoList</Typography>
            </Grid>
        )
    }

    return (
        <>
            <AddItemForm title="Add todo list" addItem={addTodoListHandler}/>
            <Grid container spacing={3} columns={12}>
                {todoLists.map(todo =>
                    <Grid item xs={12} md={6} sm={12} lg={4} key={todo.id}>
                        <TodoList todolist={todo} demo={demo}/>
                    </Grid>
                )}
            </Grid>
        </>
    )
};
