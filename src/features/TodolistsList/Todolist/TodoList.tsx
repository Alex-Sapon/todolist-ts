import {memo, useCallback} from 'react';

import {TodoListHeader} from '../../../components/TodoListHeader/TodoListHeader';
import {TasksList} from '../../../components/TasksList/TasksList';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';

import styles from './TodoList.module.css';
import {Button, Paper} from '@mui/material';

import {addTask} from '../../../store/reducers/tasks-reducer';
import {useAppDispatch} from '../../../store/hooks';
import {ValueFilterType} from '../../../api/todolist-api';
import {RequestStatusType} from '../../../store/reducers/app-reducer';

export type TodoListProps = {
    title: string
    todoListId: string
    entityStatus: RequestStatusType
    filterTasks: (todoListId: string, title: ValueFilterType) => void
    filter: ValueFilterType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
};

export const TodoList = memo((props: TodoListProps) => {
    const {title, todoListId, filterTasks, filter, removeTodoList, changeTodoListTitle, entityStatus} = props;

    const dispatch = useAppDispatch();

    const allFilterTasks = useCallback(() => {
        filterTasks(todoListId, 'all');
    }, [filterTasks, todoListId])

    const activeFilterTasks = useCallback(() => {
        filterTasks(todoListId, 'active');
    }, [filterTasks, todoListId])

    const completedFilterTasks = useCallback(() => {
        filterTasks(todoListId, 'completed');
    }, [filterTasks, todoListId])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask(todoListId, title));
    }, [dispatch, todoListId])

    return (
        <Paper sx={{padding: '1rem'}} elevation={6}>
            <TodoListHeader
                title={title}
                removeTodoList={removeTodoList}
                todoListId={todoListId}
                changeTodoListTitle={changeTodoListTitle}
                entityStatus={entityStatus}
            />
            <AddItemForm
                addItem={addTaskHandler}
                title="Add task" errorText="Todolist is required"
                className={styles.todolist_addItem}
                disabled={entityStatus === 'loading'}
                entityStatus={entityStatus}
            />
            <div className={styles.buttons}>
                <Button
                    size="small"
                    variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={allFilterTasks}
                >All</Button>
                <Button
                    size="small"
                    variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={activeFilterTasks}
                    sx={{m: '0 1rem'}}
                >Active</Button>
                <Button
                    size="small"
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={completedFilterTasks}
                >Completed</Button>
            </div>
            <TasksList filter={filter} todoListId={todoListId}/>
        </Paper>
    )
});

