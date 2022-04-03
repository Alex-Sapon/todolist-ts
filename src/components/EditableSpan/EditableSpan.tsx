import React, {ChangeEvent, FC, useState} from 'react'
import styles from './EditableSpan.module.css'

type EditableSpanType = {
    title: string
    changeValue: (value: string) => void
    inputStyles?: string
    className?: string
}

export const EditableSpan: FC<EditableSpanType> = ({title, changeValue, className, inputStyles}) => {
    const [value, setValue] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

    const activeEditMode = () => {
        setEditMode(true)
        setValue(title)
    }

    const activeViewMode = () => {
        setEditMode(false)
        value.trim() !== '' && changeValue(value)
    }

    return editMode
        ? <input
            value={value}
            onChange={onChangeHandler}
            onBlur={activeViewMode}
            autoFocus
            className={styles.edit_input}
        />
        : <span onDoubleClick={activeEditMode} className={className}>{title}</span>
}


