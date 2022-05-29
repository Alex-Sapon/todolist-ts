import {Grid, Typography} from '@mui/material';
import {TodoList} from './Todolist/TodoList';
import React, {FC, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import {ValueFilterType} from '../../api/todolist-api';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './todolists-reducer';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';

export const TodolistsList: FC = () => {
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
        <>
            <AddItemForm title={'Add todo list'} addItem={addTodoList}/>
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
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodoListTitle}
                            />
                        </Grid>)
                }
            </Grid>
        </>
    )
};