import {memo, useEffect} from 'react';
import {List, Typography} from '@mui/material';
import {Task} from '../Task/Task';
import {TaskStatus, ValueFilterType} from '../../../api/todolist-api';
import {fetchTasks} from '../tasks-reducer';
import {selectIsLoggedIn} from '../../Login';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';

export type TasksList = {
    filter: ValueFilterType
    todoListId: string
    demo?: boolean
}

export const TasksList = memo(({todoListId, filter, demo}: TasksList) => {
    const dispatch = useAppDispatch();

    let tasks = useAppSelector(state => state.tasks[todoListId]);

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    switch (filter) {
        case 'active':
            tasks = tasks.filter(task => task.status === TaskStatus.New);
            break;
        case 'completed':
            tasks = tasks.filter(task => task.status === TaskStatus.Completed);
            break;
    }

    useEffect(() => {
        if (demo || !isLoggedIn) return;
        dispatch(fetchTasks(todoListId));
    }, [demo, isLoggedIn, dispatch, todoListId])

    if (!tasks.length) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return <List>{tasks.map(task => <Task key={task.id} task={task}/>)}</List>
});
