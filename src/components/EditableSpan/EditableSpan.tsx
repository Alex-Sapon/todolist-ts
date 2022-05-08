import {TextField, Typography} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import styles from './EditableSpan.module.css';

type EditableSpanType = {
    title: string
    changeValue: (value: string) => void
    inputStyles?: string
    textStyles?: string
    children?: React.ReactNode | React.ReactChild
};

export const EditableSpan = React.memo((props: EditableSpanType) => {
    const {title, changeValue, textStyles, inputStyles, children} = props;

    const [value, setValue] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    const activeEditMode = () => {
        setEditMode(true);
        setValue(title);
    };

    const activeViewMode = () => {
        setEditMode(false);
        value.trim() !== '' && changeValue(value);
    };

    const finalInputStyles = `${inputStyles ? inputStyles : ''}`;
    const finalTextStyles = `${textStyles ? textStyles : ''}`;

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
        : <>
            <Typography className={finalTextStyles} onDoubleClick={activeEditMode}>{title}</Typography>{children}
        </>
});


