import * as React from 'react';
import Snackbar, { SnackbarCloseReason, SnackbarProps } from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

const Message: React.FC<SnackbarProps & { close?: () => void; actionColor?: AlertColor }> = (props) => {
    const { close, actionColor, message, ...snackProps } = props;
    const handleClose = (event: React.SyntheticEvent<any> | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        close?.();
    };

    return (
        <Snackbar {...snackProps} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
            <Alert severity={actionColor} onClose={() => close?.()}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Message;
