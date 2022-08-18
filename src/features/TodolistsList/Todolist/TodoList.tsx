import {memo, useCallback} from 'react';
import {AddItemForm} from '../../../components/AddItemForm';

import styles from './TodoList.module.css';
import {Button, Paper} from '@mui/material';

import {tasksActions, TasksList, TodoListHeader, todoListsActions, TodoListsDomainType} from '../';
import {useActions, useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {ValueFilterType} from '../../../api/todolist-api';
import {appSelectors} from '../../../app';

export type TodoListProps = {
    todolist: TodoListsDomainType
    demo?: boolean
};

type ButtonsType = {
    id: number
    filter: ValueFilterType
    title: string
}

const buttons: ButtonsType[] = [
    {id: 1, filter: 'all', title: 'All'},
    {id: 2, filter: 'active', title: 'Active'},
    {id: 3, filter: 'completed', title: 'Completed'},
]

export const TodoList = memo(({todolist, demo}: TodoListProps) => {
    const dispatch = useAppDispatch();

    const {removeTodoList, changeTodoListTitle, changeTodoListFilter} = useActions(todoListsActions);

    const status = useAppSelector(appSelectors.selectStatus);
    const tasks = useAppSelector(state => state.tasks[todolist.id]);

    const filterTasks = useCallback((filter: ValueFilterType) => {
        changeTodoListFilter({todoListId: todolist.id, filter: filter});
    }, [todolist.id, changeTodoListFilter])

    const addTaskHandler = useCallback(async (title: string) => {
        if (!demo) {
            const action = await dispatch(tasksActions.addTask({todoListId: todolist.id, title}));

            if (tasksActions.addTask.rejected.match(action)) {
                if (action.payload?.errors[0].length) {
                    throw new Error(action.payload.errors[0]);
                } else {
                    throw new Error('Some error occurred.');
                }
            }
        }
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
                {buttons.map(({id, filter, title}) =>
                    <Button
                        key={id}
                        size="small"
                        sx={{m: '0 .2rem'}}
                        disabled={status === 'loading' || !tasks.length}
                        variant={todolist.filter === filter ? 'contained' : 'text'}
                        onClick={() => filterTasks(filter)}
                    >{title}</Button>
                )}
            </div>
            <TasksList filter={todolist.filter} todoListId={todolist.id} demo={demo}/>
        </Paper>
    )
});

