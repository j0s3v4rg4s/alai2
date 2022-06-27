import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Button from 'components/Button';

export type ConfirmDialogProps = {
    isOpen: boolean;
    title: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
                <Button variant="text" color="error" onClick={() => props.onCancel?.()}>
                    Cancelar
                </Button>
                <Button variant="text" color="primary" onClick={() => props.onConfirm?.()}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
