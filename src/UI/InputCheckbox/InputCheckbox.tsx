import React, {FC} from 'react'
import styles from './InputCheckbox.module.css'

type DefaultInputCheckboxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputCheckboxProps = DefaultInputCheckboxProps & {
    onSelect?: () => void
}

const InputCheckbox: FC<InputCheckboxProps> = (
    {
        checked,
        onSelect,
        className,
        children,
        ...props
    }) => {

    const onSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelect && onSelect(event)
    }

    return (
        <label className={styles.title}>
            <input
                type={'checkbox'}
                className={`${styles.input} ${className}`}
                onChange={onSelectHandler}
                checked={checked}
                {...props}
            />
                {children && <span className={`${checked ? styles.text_through : ''}`}>{children}</span>}
        </label>
    )
}

export default InputCheckbox