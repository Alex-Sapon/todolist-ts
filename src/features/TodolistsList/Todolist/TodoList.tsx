import {memo, useCallback} from 'react';

import {TasksList} from '../TasksList/TasksList';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';

import styles from './TodoList.module.css';
import {Button, Paper} from '@mui/material';

import {addTask} from '../tasks-reducer';
import {todoListsActions, TodoListHeader, TodoListsDomainType} from '../';
import {useActions, useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {ValueFilterType} from '../../../api/todolist-api';

export type TodoListProps = {
    todolist: TodoListsDomainType
    demo?: boolean
};

export const TodoList = memo(({todolist, demo}: TodoListProps) => {
    const dispatch = useAppDispatch();

    const {removeTodoList, changeTodoListTitle, changeTodoListFilter} = useActions(todoListsActions);

    const status = useAppSelector(state => state.app.status);
    const tasks = useAppSelector(state => state.tasks[todolist.id]);

    const filterTasks = useCallback((filter: ValueFilterType) => {
        changeTodoListFilter({todoListId: todolist.id, filter: filter});
    }, [todolist.id, changeTodoListFilter])

    const addTaskHandler = useCallback((title: string) => {
        !demo && dispatch(addTask({todoListId: todolist.id, title}));
    }, [dispatch, todolist.id, demo])

    return (
        <Paper sx={{padding: '1rem'}} elevation={6}>
            <TodoListHeader
                title={todolist.title}
                removeTodoList={removeTodoList}
                todoListId={todolist.id}
                changeTodoListTitle={changeTodoListTitle}
                entityStatus={todolist.entityStatus}
            />
            <AddItemForm
                addItem={addTaskHandler}
                title="Enter task"
                errorText="Task is required"
                className={styles.todolist_addItem}
                disabled={todolist.entityStatus === 'loading'}
                entityStatus={todolist.entityStatus}
            />
            <div className={styles.buttons}>
                <Button
                    size="small"
                    disabled={status === 'loading' || !tasks.length}
                    variant={todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={() => filterTasks('all')}
                >All</Button>
                <Button
                    size="small"
                    disabled={status === 'loading' || !tasks.length}
                    variant={todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={() => filterTasks('active')}
                    sx={{m: '0 1rem'}}
                >Active</Button>
                <Button
                    size="small"
                    disabled={status === 'loading' || !tasks.length}
                    variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={() => filterTasks('completed')}
                >Completed</Button>
            </div>
            <TasksList filter={todolist.filter} todoListId={todolist.id} demo={demo}/>
        </Paper>
    )
});

