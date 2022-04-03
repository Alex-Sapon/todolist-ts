import React, {FC} from 'react'
import styles from './InputText.module.css'

type DefaultInputPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    onEnter?: () => void
    onChangeValue?: (value: string) => void
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
        <input
            type={'text'}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            onBlur={props.onBlur}
            className={`${styles.input} ${props.className} `}
            {...props}
        />
    );
};

export default InputText;