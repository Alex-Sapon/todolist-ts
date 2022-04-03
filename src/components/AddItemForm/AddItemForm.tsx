import React, {FC, useState} from 'react'
import styles from '../TodoList/TodoList.module.css';
import InputText from '../../UI/InputText/InputText';
import Button from '../../UI/Button/Button';

type AddItemFormType = {
    title: string
    placeholder?: string
    className?: string
    addItem: (value: string) => void
}

export const AddItemForm: FC<AddItemFormType> = ({title, className, placeholder, addItem}) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        if (value.trim() !== '') {
            addItem(value)
            setValue('')
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setValue(event.currentTarget.value)
    }

    const onBlurHandler = () => setError(false)

    const inputClasses = `${styles.input} ${error ? styles.error : ''}`

    return (
       <div className={className}>
           <div className={styles.input_block}>
               <InputText
                   value={value}
                   placeholder={placeholder}
                   className={inputClasses}
                   title={title}
                   onEnter={addTask}
                   onChange={onChangeHandler}
                   onBlur={onBlurHandler}
               />
               <Button className={styles.button} title={title} onClick={addTask}/>
           </div>
           {error && <div className={styles.error_title}>Task is required</div>}
       </div>
    )
}