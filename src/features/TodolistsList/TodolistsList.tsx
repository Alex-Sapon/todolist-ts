import {Grid, Typography} from '@mui/material';
import {selectTodoLists, TodoList, todoListsActions} from './';
import {useCallback, useEffect} from 'react';
import {useActions, useAppDispatch, useAppSelector} from '../../utils/hooks';
import {AddItemForm} from '../../components/AddItemForm';
import {Navigate} from 'react-router';
import {authSelectors} from '../Login';

type TodolistsListType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: TodolistsListType) => {
    const dispatch = useAppDispatch();

    const todoLists = useAppSelector(selectTodoLists);
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn);

    const {fetchTodoLists} = useActions(todoListsActions);

    const addTodoListHandler = useCallback(async (title: string) => {
        const action = await dispatch(todoListsActions.addTodoList(title));

        if (todoListsActions.addTodoList.rejected.match(action)) {
            if (action.payload?.errors) {
                throw new Error(action.payload.errors[0]);
            } else {
                throw new Error('Some error occurred.');
            }

        }
    }, [dispatch])

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
