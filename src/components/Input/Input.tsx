import React, {FC, useState} from 'react'
import {TextField} from '@mui/material'
import styles from './Input.module.css'

type InputProps = {
    value: string
    setValue: (value: string) => void
    onKeyPressHandler: () => void
}

const Input: FC<InputProps> = (props) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue(event.currentTarget.value)
    }

    const onKeyPresHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.onKeyPressHandler()
        }
    }

    return (
        <TextField
            size={'small'}
            className={styles.input}
            onChange={onChangeHandler}
            onKeyPress={onKeyPresHandler}
            value={props.value}
        />
    );
};

export default Input;