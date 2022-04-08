import React, {FC, useState, KeyboardEvent, FocusEvent} from 'react'
import styles from './AddItemForm.module.css'
import {Button, Container, Fab, IconButton, TextField} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormType = {
    title: string
    className?: string
    addItem: (value: string) => void
    errorText?: string
}

export const AddItemForm: FC<AddItemFormType> = ({title, className, addItem, errorText}) => {
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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setValue(e.currentTarget.value)
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => setError(false)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addTask()

    const inputClasses = `${styles.input} ${error ? styles.error : ''}`

    return (
       <Container sx={{mb: '2rem', display: 'flex', alignItems: 'center'}} fixed>
           <TextField
                fullWidth
                size={'small'}
                value={value}
                error={error}
                label={title}
                helperText={error && errorText}
                onClick={addTask}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
           <AddBox className={styles.add_button} onClick={addTask}/>
       </Container>
    )
}