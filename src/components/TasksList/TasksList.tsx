import React from 'react';
import {TaskType} from '../../App';
import {List, Typography} from '@mui/material';
import {Task} from './Task/Task';

export type TasksList = {
    tasks: Array<TaskType>
    todoListId: string
};

export const TasksList = React.memo((props: TasksList) => {
    console.log('TaskList');

    const {todoListId, tasks} = props;

    if (tasks.length === 0) return <Typography sx={{textAlign: 'center'}} variant="subtitle1">No tasks...</Typography>

    return (
        <List>
            {tasks.map(task => <Task key={task.id} task={task} todoListID={todoListId}/>)}
        </List>
    )
});


// const removeHandler = () => dispatch(removeTaskAC(todoListId, task.id));
// const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     dispatch(changeStatusAC(todoListId, e.currentTarget.checked, task.id));
// }
// const changeValueHandler = (value: string) => {
//     dispatch(changeValueTaskAC(todoListId, value, task.id));
// }
//
// return (
//     <ListItem key={task.id} className={styles.list_item_wrapper}>
//         <Paper className={styles.list_item} sx={{backgroundColor: '#b3e5fc'}}>
//             <Checkbox size="small" checked={task.isDone} onChange={changeStatusHandler}/>
//             <EditableSpan
//                 title={task.title}
//                 changeValue={changeValueHandler}
//                 textStyles={styles.item_title}
//             />
//             <DeleteIcon className={styles.delete} onClick={removeHandler}/>
//         </Paper>
//     </ListItem>
// )
