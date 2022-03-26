import React, {ChangeEvent, FC} from 'react';
import {TaskType} from '../../App';

import styles from './TasksList.module.css'
import InputCheckbox from '../../UI/InputCheckbox/InputCheckbox';
import ButtonRemove from '../../UI/ButtonRemove/ButtonRemove';

export type TasksList = {
    todoListId: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    isChecked: (isDone: boolean, id: string, todoListId: string) => void
}

const TasksList: FC<TasksList> = (props) => {
    if (props.tasks.length === 0) return <h3 className={styles.no_tasks}>No tasks</h3>

    return (
        <ul className={styles.list}>
            {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.todoListId)
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.isChecked(event.currentTarget.checked, task.id, props.todoListId)
                    }

                    return (
                        <li className={styles.item} key={task.id}>
                            <InputCheckbox
                                checked={task.isDone}
                                onChange={onChangeHandler}
                            >
                                {task.title}
                            </InputCheckbox>
                            <ButtonRemove onClick={onRemoveHandler}/>
                        </li>
                    )
                }
            )}
        </ul>
    );
};

export default TasksList;