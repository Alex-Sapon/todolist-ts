import {memo, useCallback} from 'react';

import {TodoListHeader} from '../TodoListHeader/TodoListHeader';
import {TasksList} from '../TasksList/TasksList';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';

import styles from './TodoList.module.css';
import {Button, Paper} from '@mui/material';

import {addTask} from '../../../store/reducers/tasks-reducer';
import {useAppDispatch} from '../../../store/hooks';
import {ValueFilterType} from '../../../api/todolist-api';
import {TodoListsDomainType} from '../../../store/reducers/todolists-reducer';

export type TodoListProps = {
    todolist: TodoListsDomainType
    filterTasks: (todoListId: string, title: ValueFilterType) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    demo?: boolean
};

export const TodoList = memo((props: TodoListProps) => {
    const {filterTasks, removeTodoList, changeTodoListTitle, demo, todolist} = props;

    const dispatch = useAppDispatch();

    const allFilterTasks = useCallback(() => {
        filterTasks(todolist.id, 'all');
    }, [filterTasks, todolist.id])

    const activeFilterTasks = useCallback(() => {
        filterTasks(todolist.id, 'active');
    }, [filterTasks, todolist.id])

    const completedFilterTasks = useCallback(() => {
        filterTasks(todolist.id, 'completed');
    }, [filterTasks, todolist.id])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask(todolist.id, title));
    }, [dispatch, todolist.id])

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
                    variant={todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={allFilterTasks}
                >All</Button>
                <Button
                    size="small"
                    variant={todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={activeFilterTasks}
                    sx={{m: '0 1rem'}}
                >Active</Button>
                <Button
                    size="small"
                    variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={completedFilterTasks}
                >Completed</Button>
            </div>
            <TasksList filter={todolist.filter} todoListId={todolist.id} demo={demo}/>
        </Paper>
    )
});

