import React, {FC} from 'react';
import {TaskType} from '../../App';
import Button from '../Button/Button';

import styles from './TasksList.module.css'
import {FaTrashAlt} from 'react-icons/all';

export type TasksList = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}

const TasksList: FC<TasksList> = (props) => {
    if (props.tasks.length === 0) return <h3>No tasks</h3>

    return (
        <ul className={styles.list}>
            {props.tasks.map(task =>
                <li className={styles.item} key={task.id}>
                    <label className={styles.title}>
                        <input className={styles.input} type={'checkbox'} checked={task.isDone}/>
                        {task.title}
                    </label>
                    <FaTrashAlt className={styles.button_remove} onClick={() => props.removeTask(task.id)}/>
                </li>
            )}
        </ul>
    );
};

export default TasksList;