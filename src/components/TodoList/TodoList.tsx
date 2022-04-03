import React, {FC} from 'react';
import {TaskType, ValueFilterType} from '../../App';

import TodoListHeader from '../TodoListHeader/TodoListHeader';
import TasksList from '../TasksList/TasksList';
import Button from '../../UI/Button/Button';

import styles from './TodoList.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';

export type TodoListProps = {
    title: string
    todoListId: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    filterTasks: (todoListId: string, value: ValueFilterType) => void
    addTask: (todoListId: string, value: string) => void
    isChecked: (todoListId: string, isDone: boolean, id: string) => void
    filter: ValueFilterType
    removeTodoList: (todoListId: string) => void
    addTodoList: (value: string) => void
    changeValueTask: (todoListId: string, value: string, id: string) => void
    changeTodoListTitle: (todoListId: string, value: string) => void
}

const TodoList: FC<TodoListProps> = (props) => {
    const allFilterTasks = () => props.filterTasks(props.todoListId, 'all')
    const activeFilterTasks = () => props.filterTasks(props.todoListId, 'active')
    const completedFilterTasks = () => props.filterTasks(props.todoListId, 'completed')

    const addTodoList = (value: string) => props.addTask(props.todoListId, value)

    return (
        <div className={styles.todo_item}>
            <TodoListHeader
                title={props.title}
                removeTodoList={props.removeTodoList}
                todoListId={props.todoListId}
                changeTodoListTitle={props.changeTodoListTitle}
            />
            <AddItemForm
                addItem={addTodoList}
                title={'Add task'}
                placeholder={'Task...'}
                className={styles.todo_input}
            />
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
                    changeValueTask={props.changeValueTask}
                />
            </div>
        </div>
    )
}

export default TodoList;

