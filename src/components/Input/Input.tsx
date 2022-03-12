import React, {useState} from 'react'
import {TextField} from '@mui/material'
import styles from './Input.module.css'

const Input = () => {
    const [value, setValue] = useState('')

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onKeyPresHandler = () => {

    }

    return (
        <TextField
            size={'small'}
            className={styles.input}
            onChange={onChangeHandler}
            onKeyPress={onKeyPresHandler}
            value={value}
        />
    );
};

export default Input;