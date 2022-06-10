import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from 'react-redux';
import {RootStateType} from '../../store/store';
import {useAppSelector} from '../../store/hooks';
import {setAppErrorMessage} from '../../store/reducers/app-reducer';

const selectAppErrorMessage = (state: RootStateType) => state.app.errorMessage;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const dispatch = useDispatch();

    const error = useAppSelector(selectAppErrorMessage);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorMessage(null));
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>{error}</Alert>
        </Snackbar>
    );
}