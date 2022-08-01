import * as React from 'react';
import { Link } from 'react-router-dom';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

import Marco from 'components/Marco';
import { ROUTES } from 'constants/routes.constant';
import { TABLE_NAME } from 'constants/table.constants';
import { definitions } from 'types/supabase';
import { supabase } from 'utils/superbase';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Nombre',
        hideable: false,
        flex: 1,
    },
    {
        field: 'nit',
        headerName: 'Nit',
        flex: 1,
        hideable: false,
    },
    {
        width: 70,
        sortable: false,
        disableColumnMenu: true,
        field: 'actions',
        headerName: '',
        align: 'center',
        renderCell: (params) => (
            <Link to={`${ROUTES.client}/${params.row.id}`}>
                <IconButton>
                    <RemoveRedEyeIcon />
                </IconButton>
            </Link>
        ),
    },
]

const Client = () => {
    const [clients, setClients] = React.useState<definitions['client'][]>([]);

    React.useEffect(() => {
        supabase
            .from<definitions['client']>(TABLE_NAME.client)
            .select('*')
            .then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    setClients(data);
                }
            });
    }, []);

    return (
        <Marco title="Clientes" to={ROUTES.client}>
            <Container maxWidth="lg" sx={{ pt: 4, display: 'flex', pb: 4 }} className="flex-col h-full">
                <Box className="flex flex-row-reverse mb-6">
                    <Link to={ROUTES.newClient}>
                        <Button variant="contained">Crear cliente</Button>
                    </Link>
                </Box>

                <Paper elevation={3} className="flex-1 mt-3 p-3 w-full">
                    <DataGrid
                        disableSelectionOnClick={true}
                        columns={columns}
                        rows={clients}
                        rowsPerPageOptions={[5, 10, 50]}
                        pageSize={10}
                    />
                </Paper>
            </Container>
        </Marco>
    );
};

export default Client;
