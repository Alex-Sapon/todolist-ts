import React, {FC, useState} from 'react';
import {TaskType, ValueFilterType} from '../../App';

import TodoListHeader from '../TodoListHeader/TodoListHeader';
import TasksList from '../TasksList/TasksList';
import Button from '../../UI/Button/Button';
import InputText from '../../UI/InputText/InputText';

import styles from './TodoList.module.css'

export type TodoListProps = {
    title: string
    todoListId: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    filterTasks: (value: ValueFilterType, todoListId: string) => void
    addTask: (value: string, todoListId: string) => void
    isChecked: (isDone: boolean, id: string, todoListId: string) => void
    filter: ValueFilterType
    removeTodoList: (todoListId: string) => void
}

const TodoList: FC<TodoListProps> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.todoListId)
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

    const allFilterTasks = () => props.filterTasks('all', props.todoListId)
    const activeFilterTasks = () => props.filterTasks('active', props.todoListId)
    const completedFilterTasks = () => props.filterTasks('completed', props.todoListId)

    const inputClasses = `${styles.input} ${error ? styles.error : ''}`

    return (
        <div className={styles.todo_item}>
            <TodoListHeader
                title={props.title}
                removeTodoList={props.removeTodoList}
                todoListId={props.todoListId}
            />
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
                    todoListId={props.todoListId}
                />
            </div>
        </div>
    )
}

export default TodoList;

