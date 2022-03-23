import React, {ChangeEvent, FC} from 'react';
import {TaskType} from '../../App';

import styles from './TasksList.module.css'
import {FaTrashAlt} from 'react-icons/all';
import Input from '../InputText/InputText';

export type TasksList = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    isChecked: (isDone: boolean, id: string) => void
}

const TasksList: FC<TasksList> = (props) => {
    if (props.tasks.length === 0) return <h3 className={styles.no_tasks}>No tasks</h3>

    return (
        <ul className={styles.list}>
            {props.tasks.map(task => {
                    const onClickRemoveHandler = () => props.removeTask(task.id)
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.isChecked(event.currentTarget.checked, task.id)
                    }

                    return (
                        <li className={styles.item} key={task.id}>
                            <label className={styles.title}>
                                <input
                                    className={styles.input}
                                    type={'checkbox'}
                                    checked={task.isDone}
                                    onChange={onChangeHandler}
                                />
                                <span className={task.isDone ? styles.text_through : ''}>{task.title}</span>
                            </label>
                            <FaTrashAlt className={styles.button_remove} onClick={onClickRemoveHandler}/>
                        </li>
                    )
                }
            )}
        </ul>
    );
};

export default TasksList;