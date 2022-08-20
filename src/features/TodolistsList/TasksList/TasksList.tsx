import {memo, useEffect} from 'react';
import {List, Typography} from '@mui/material';
import {TaskStatus, ValueFilterType} from '../../../api/todolist-api';
import {authSelectors} from '../../Login';
import {useActions, useAppSelector} from '../../../utils/hooks';
import {selectTasks, Task, tasksActions} from '../';

export type TasksList = {
    filter: ValueFilterType
    todoListId: string
    demo?: boolean
}

export const TasksList = memo(({todoListId, filter, demo}: TasksList) => {
    const {fetchTasks} = useActions(tasksActions);

    let tasks = useAppSelector(selectTasks(todoListId));

    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn);

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
        fetchTasks(todoListId);
    }, [demo, isLoggedIn, fetchTasks, todoListId])

    if (!tasks.length) {
        return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>
    }

    return <List>{tasks.map(task => <Task key={task.id} task={task}/>)}</List>
});
