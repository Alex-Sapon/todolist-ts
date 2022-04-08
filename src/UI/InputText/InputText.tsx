import {TextField } from '@mui/material';
import React, {FC} from 'react'
import styles from './InputText.module.css'

// type DefaultInputPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = {
    onEnter?: () => void
    onChangeValue?: (value: string) => void
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: FC<InputPropsType> = (
    {
        onKeyPress, onEnter,
        onChangeValue, onChange, ...props
    }) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event)
        onChangeValue && onChangeValue(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(event)
        onEnter && event.key === 'Enter' && onEnter()
    }

    return (
        <TextField
            variant={'outlined'}
            type={'text'}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
    );
};

export default InputText;