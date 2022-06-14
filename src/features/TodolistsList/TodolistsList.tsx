import {Grid, Typography} from '@mui/material';
import {TodoList} from './Todolist/TodoList';
import {useCallback, useEffect} from 'react';
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
import {selectTodoLists} from '../../store/selectors/select-todoLists';
import {RootStateType} from '../../store/store';
import {Navigate} from 'react-router';

type TodolistsListType = {
    demo?: boolean
}

export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn;

export const TodolistsList = ({demo = false}: TodolistsListType) => {
    const dispatch = useAppDispatch();

    const todoLists = useAppSelector(selectTodoLists);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }

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

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    if (todoLists.length === 0) {
        return (
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Typography sx={{textAlign: 'center', mt: '2rem'}} variant="h5">Add TodoList.</Typography>
            </Grid>
        )
    }

    return (
        <>
            <AddItemForm title="Add todo list" addItem={addTodoListHandler}/>
            <Grid container spacing={3} columns={12}>
                {todoLists.map(todo =>
                    <Grid item xs={12} md={6} sm={12} lg={4}>
                        <TodoList
                            todolist={todo}
                            filterTasks={changeFilter}
                            removeTodoList={deleteTodoList}
                            changeTodoListTitle={changeTodoListTitleHandler}
                            demo={demo}
                        />
                    </Grid>
                )}
            </Grid>
        </>
    )
};
