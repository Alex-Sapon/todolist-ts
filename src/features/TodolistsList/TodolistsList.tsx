import {Grid, Typography} from '@mui/material';
import {TodoList} from './Todolist/TodoList';
import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {ValueFilterType} from '../../api/todolist-api';
import {
    addTodoList,
    changeTodoListFilterAC,
    changeTodoListTitle,
    fetchTodoLists,
    removeTodoList
} from '../../store/reducers/todolists-reducer';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {selectTodoLists} from '../../store/selectors/selectTodoLists';

export const TodolistsList = () => {
    const dispatch = useAppDispatch();

    const todoLists = useAppSelector(selectTodoLists);

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, []);

    const changeFilter = useCallback((todoListId: string, filter: ValueFilterType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter));
    }, [dispatch])

    const deleteTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoList(todoListId));
    }, [dispatch])

    const addTodoListHandler = useCallback((title: string) => {
        dispatch(addTodoList(title));
    }, [dispatch])

    const changeTodoListTitleHandler = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitle(todoListId, title));
    }, [dispatch])

    return (
        <>
            <AddItemForm title={'Add todo list'} addItem={addTodoListHandler}/>
            <Grid container spacing={3} columns={12}>
                {todoLists.length === 0
                    ? <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Typography sx={{textAlign: 'center', mt: '2rem'}} variant={'h5'}>Add TodoList.</Typography>
                    </Grid>
                    : todoLists.map(todo =>
                        <Grid item xs={12} md={6} sm={12} lg={4}>
                            <TodoList
                                todoListId={todo.id}
                                title={todo.title}
                                filterTasks={changeFilter}
                                filter={todo.filter}
                                removeTodoList={deleteTodoList}
                                changeTodoListTitle={changeTodoListTitleHandler}
                            />
                        </Grid>
                    )}
            </Grid>
        </>
    )
};
