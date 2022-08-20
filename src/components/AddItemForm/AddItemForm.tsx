import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {AxiosError} from 'axios';
import {Container, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';
import styles from './AddItemForm.module.css';

export type AddItemFormType = {
    title: string
    entityStatus?: string
    disabled?: boolean
    className?: string
    addItem: (value: string) => void
    errorText?: string
};

export const AddItemForm = memo((props: AddItemFormType) => {
    const {title, className, addItem, disabled, entityStatus} = props;

    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = async () => {
        if (value.trim() !== '') {
            try {
                await addItem(value);
                setValue('');
            } catch (e) {
                setError((e as AxiosError).message);
            }

        } else {
            setError('Title is required');
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error !== null && setError(null);
        setValue(e.currentTarget.value);
    };

    const onBlurHandler = () => setError(null);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        e.key === 'Enter' && addItemHandler()
    };

    const inputClasses = `${styles.input} ${error ? styles.error : ''} ${className ? className : ''}`;

    return (
        <Container sx={{mb: '2rem', display: 'flex', alignItems: 'center', height: '2rem'}} fixed>
            <TextField
                fullWidth
                size="small"
                value={value}
                error={!!error}
                label={title}
                disabled={disabled}
                className={inputClasses}
                helperText={error}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                sx={{mr: '1rem'}}
            />
            {entityStatus === 'loading'
                ? <LoadingButton loading variant="text" sx={{minWidth: '24px'}}/>
                : <AddBox className={styles.add_button} onClick={addItemHandler}/>}
        </Container>
    )
});