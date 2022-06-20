import * as React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { useLocation } from 'react-router-dom';

import Marco from 'components/Marco';
import { ROUTES } from 'constants/routes.constant';
import Message from 'components/Message';

const Products: React.FC = () => {
    const location = useLocation();
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

    React.useEffect(() => {
        const state = location.state as { status: string } | null;
        if (state?.status === 'success') {
            setModal({ isOpen: true, message: 'Producto creado' });
        }
    }, [location]);

    const columns: GridColDef[] = [
        { field: 'code', type: 'date', headerName: 'Código', flex: 1 },
        { field: 'reference', type: 'string', headerName: 'Referencia', flex: 1 },
    ];

    const rows: GridRowsProp = [
        { code: new Date(), reference: '2', id: 0 },
        { code: true, reference: '3', id: 1 },
        { code: true, reference: '4', id: 3 },
    ];

    return (
        <Marco title="Productos" to={ROUTES.product}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box className="flex flex-row-reverse mb-6">
                    <Link to={ROUTES.newProduct}>
                        <Button variant="contained">Crear producto</Button>
                    </Link>
                </Box>

                <Paper elevation={3} sx={{ p: 3, height: 300, width: '100%' }}>
                    <DataGrid columns={columns} rows={rows} rowsPerPageOptions={[5, 10, 50]} pageSize={10} />
                </Paper>
            </Container>
            <Message
                actionColor="success"
                message={modal.message}
                open={modal.isOpen}
                autoHideDuration={3000}
                close={() => setModal({ ...modal, isOpen: false })}
            />
        </Marco>
    );
};

export default Products;
