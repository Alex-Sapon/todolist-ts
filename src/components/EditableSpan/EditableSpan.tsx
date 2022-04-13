import { TextField, Typography } from '@mui/material'
import React, {ChangeEvent, FC, useState} from 'react'
import styles from './EditableSpan.module.css'

type EditableSpanType = {
    title: string
    changeValue: (value: string) => void
    inputStyles?: string
    textStyles?: string
}

export const EditableSpan: FC<EditableSpanType> = ({title, changeValue, textStyles, inputStyles}) => {
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

    const finalInputStyles = `${inputStyles ? inputStyles : ''}`
    const finalTextStyles = `${textStyles ? textStyles : ''}`

    return editMode
        ? <TextField
            fullWidth
            variant={'standard'}
            size={'small'}
            value={value}
            onChange={onChangeHandler}
            onBlur={activeViewMode}
            autoFocus
            className={finalInputStyles}
        />
        : <Typography className={textStyles} onDoubleClick={activeEditMode}>{title}</Typography>
}


