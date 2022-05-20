import React, {useState, KeyboardEvent, FocusEvent, ChangeEvent} from 'react';
import styles from './AddItemForm.module.css';
import {Container, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

export type AddItemFormType = {
    title: string
    className?: string
    addItem: (value: string) => void
    errorText?: string
};

export const AddItemForm = React.memo(({title, className, addItem, errorText}: AddItemFormType) => {
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

    const onBlurHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => setError(false);
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addTask();

    // const inputClasses = `${styles.input} ${error ? styles.error : ''}`;

    return (
        <Container sx={{mb: '2rem', display: 'flex', alignItems: 'center', height: '2rem'}} fixed>
            <TextField
                fullWidth
                size={'small'}
                value={value}
                error={error}
                label={title}
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