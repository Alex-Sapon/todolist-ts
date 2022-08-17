import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {RootStateType} from '../../app/store';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {setAppErrorMessage} from '../../app';

const selectAppErrorMessage = (state: RootStateType) => state.app.errorMessage;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch();

    const error = useAppSelector(selectAppErrorMessage);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorMessage({error: null}));
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>{error}</Alert>
        </Snackbar>
    );
}