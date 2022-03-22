import React, {FC} from 'react'
import styles from './Input.module.css'

type DefaultInputPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    title: string
    addTask: () => void
    className?: string
    placeholder?: string
}

const Input: FC<InputPropsType> = (props) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(event)
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && props.addTask()
    }

    return (
        <input
            placeholder={props.placeholder}
            className={`${styles.input} ${props.className} `}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            value={props.title}
            onBlur={props.onBlur}
        />
    );
};

export default Input;