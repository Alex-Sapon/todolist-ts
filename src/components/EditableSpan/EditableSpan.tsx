import React, {ChangeEvent, FC, useState} from 'react'
import styles from './EditableSpan.module.css'

type EditableSpanType = {
    title: string
    changeValue: (value: string) => void
    inputStyles?: string
    className?: string
}

export const EditableSpan: FC<EditableSpanType> = ({title, changeValue, className, inputStyles, children}) => {
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

    const finalInputStyles = `${inputStyles ? inputStyles : styles.edit_input}`

    return editMode
        ? <input
            value={value}
            onChange={onChangeHandler}
            onBlur={activeViewMode}
            autoFocus
            className={finalInputStyles}
        />
        : <span onDoubleClick={activeEditMode} className={className}>{title}</span>

    // return (
    //     <span contentEditable={editMode} onDoubleClick={activeEditMode} className={className} onBlur={activeViewMode}>
    //         {title}
    //     </span>
    // )
}


