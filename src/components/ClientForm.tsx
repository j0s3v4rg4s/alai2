import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import 'css/ClientForm.css';

export interface ClientInput {
    name: string;
    nit: string;
}

export interface ClientFormProps {
    clientForm: UseFormReturn<ClientInput>;
}

const ClientForm: React.FC<ClientFormProps> = ({ clientForm }) => {
    return (
        <Box>
            <form className="grid grid-cols-1 sm:flex gap-3">
                <TextField
                    error={!!clientForm.formState.errors.name}
                    {...clientForm.register('name', { required: true })}
                    label="Nombre"
                    variant="outlined"
                />
                <TextField
                    error={!!clientForm.formState.errors.nit}
                    {...clientForm.register('nit', { required: true })}
                    label="Nit"
                    variant="outlined"
                />
            </form>
        </Box>
    );
};

export default ClientForm;
