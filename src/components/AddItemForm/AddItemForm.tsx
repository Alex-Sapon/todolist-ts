import React, {useState, KeyboardEvent, FocusEvent, ChangeEvent} from 'react';
import styles from './AddItemForm.module.css';
import {Container, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

export type AddItemFormType = {
    title: string
    disabled?: boolean
    className?: string
    addItem: (value: string) => void
    errorText?: string
};

export const AddItemForm = React.memo(({title, className, addItem, errorText, disabled}: AddItemFormType) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const addTask = () => {
        if (value.trim() !== '') {
            addItem(value);
            setValue('');
        } else {
            setError(true);
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setValue(e.currentTarget.value);
    };

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => setError(false);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        // disabling click of button after request for delete todolist
        !disabled && e.key === 'Enter' && addTask()
    };

    const inputClasses = `${styles.input} ${error ? styles.error : ''} ${className ? className : ''}`;

    return (
        <Container sx={{mb: '2rem', display: 'flex', alignItems: 'center', height: '2rem'}} fixed>
            <TextField
                fullWidth
                size={'small'}
                value={value}
                error={error}
                label={title}
                disabled={disabled}
                className={inputClasses}
                helperText={error && errorText}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                sx={{mr: '1rem'}}
            />
            <AddBox className={styles.add_button} onClick={addTask}/>
        </Container>
    )
});