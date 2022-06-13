import * as React from 'react';

import Marco from 'components/Marco';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const Products: React.FC = () => {
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
        <Marco>
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Box className="flex flex-row-reverse mb-4">
                    <Button variant="contained">Crear producto</Button>
                </Box>

                <Paper elevation={3} sx={{ p: 3, height: 300, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        rowsPerPageOptions={[5, 10, 50]}
                        pageSize={10}
                    />
                </Paper>
            </Container>
        </Marco>
    );
};

export default Products;
