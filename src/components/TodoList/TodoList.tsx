import React, {FC, useState} from 'react';
import {TaskType, ValueFilterType} from '../../App';

import TodoListHeader from '../TodoListHeader/TodoListHeader';
import TasksList from '../TasksList/TasksList';
import Button from '../../UI/Button/Button';
import InputText from '../../UI/InputText/InputText';

import styles from './TodoList.module.css'

export type TodoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTasks: (value: ValueFilterType) => void
    addTask: (value: string) => void
    isChecked: (isDone: boolean, id: string) => void
    filter: ValueFilterType
}

const TodoList: FC<TodoListProps> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }

    const onBlurHandler = () => setError(false)

    const allFilterTasks = () => props.filterTasks('all')
    const activeFilterTasks = () => props.filterTasks('active')
    const completedFilterTasks = () => props.filterTasks('completed')

    const inputClasses = `${styles.input} ${error ? styles.error : ''}`

    return (
        <div>
            <TodoListHeader title={props.title}/>
            <div className={styles.input_block}>
                <InputText
                    value={title}
                    placeholder={'Task...'}
                    className={inputClasses}
                    title={title}
                    onEnter={addTask}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                />
                <Button
                    className={styles.button}
                    title={'Add task'}
                    onClick={addTask}
                />
            </div>
            {error && <div className={styles.error_title}>Task is required</div>}
            <div className={styles.buttons}>
                <Button
                    title={'All'}
                    onClick={allFilterTasks}
                    className={props.filter === 'all' ? styles.button_active : ''}
                />
                <Button
                    title={'Active'}
                    onClick={activeFilterTasks}
                    className={props.filter === 'active' ? styles.button_active : ''}
                />
                <Button
                    title={'Completed'}
                    onClick={completedFilterTasks}
                    className={props.filter === 'completed' ? styles.button_active : ''}
                />
            </div>
            <div>
                <TasksList
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    isChecked={props.isChecked}
                />
            </div>
        </div>
    )
}

export default TodoList;

