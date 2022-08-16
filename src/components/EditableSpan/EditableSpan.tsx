import {TextField, Typography} from '@mui/material';
import React, {ChangeEvent, memo, useState} from 'react';
import {useAppSelector} from '../../utils/hooks';
import {selectStatus} from '../../app';

export type EditableSpanType = {
    title: string
    changeValue: (value: string) => void
    inputStyles?: string
    textStyles?: string
    children?: React.ReactNode
};

export const EditableSpan = memo((props: EditableSpanType) => {
    const {title, changeValue, textStyles, inputStyles, children} = props;

    const [value, setValue] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);

    const status = useAppSelector(selectStatus);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

    const activeEditMode = () => {
        setEditMode(true);
        setValue(title);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        value.trim() !== '' && changeValue(value);
    };

    const finalInputStyles = `${inputStyles ? inputStyles : ''}`;
    const finalTextStyles = `${textStyles ? textStyles : ''}`;

    return status !== 'loading' && editMode
        ? <TextField
            fullWidth
            variant="standard"
            size="small"
            value={value}
            onChange={onChangeHandler}
            onBlur={deactivateEditMode}
            autoFocus
            className={finalInputStyles}
        />
        : <>
            <Typography className={finalTextStyles} onDoubleClick={activeEditMode}>{title}</Typography>
            {children}
        </>
});


