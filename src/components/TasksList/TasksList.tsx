import React, {ChangeEvent, FC} from 'react';
import {TaskType} from '../../App';

import styles from './TasksList.module.css'
import InputCheckbox from '../../UI/InputCheckbox/InputCheckbox';
import ButtonRemove from '../../UI/ButtonRemove/ButtonRemove';
import {EditableSpan} from '../EditableSpan/EditableSpan';

export type TasksList = {
    todoListId: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    isChecked: (todoListId: string, isDone: boolean, id: string) => void
    changeValueTask: (todoListId: string, title: string, id: string) => void
}

const TasksList: FC<TasksList> = ({todoListId, tasks, isChecked, removeTask, changeValueTask}) => {
    if (tasks.length === 0) return <h3 className={styles.no_tasks}>No tasks</h3>

    return (
        <ul className={styles.list}>
            {tasks.map(task => {
                    const onRemoveHandler = () => removeTask(todoListId, task.id)
                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        isChecked(todoListId, event.currentTarget.checked, task.id)
                    }
                    const onChangeValueHandler = (value: string) => changeValueTask(todoListId, value, task.id)

                    return (
                        <li className={styles.item} key={task.id}>
                            <InputCheckbox checked={task.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan
                                title={task.title}
                                changeValue={onChangeValueHandler}
                                className={styles.item_title}/>
                            <ButtonRemove onClick={onRemoveHandler} className={styles.item_button_remove}/>
                        </li>
                    )
                }
            )}
        </ul>
    );
};

export default TasksList;