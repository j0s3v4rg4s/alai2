import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import ImageIcon from '@mui/icons-material/Image';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import ImgStorage from 'components/imgStorage';
import Marco from 'components/Marco';
import Message from 'components/Message';
import { ROUTES } from 'constants/routes.constant';
import { definitions } from 'types/supabase';
import { supabase } from 'utils/superbase';

const columns: GridColDef[] = [
    {
        field: 'imgRef',
        headerName: 'Imagen',
        minWidth: 160,
        align: 'center',
        flex: 1,
        hideable: false,
        renderCell: (params) => {
            return params.value ? (
                <ImgStorage path={params.value} alt="" className="w-40 h-40 object-cover" />
            ) : (
                <Box sx={{ fontSize: '80px' }}>
                    <ImageIcon fontSize="inherit" color="info" />
                </Box>
            );
        },
    },
    { field: 'code', headerName: 'Código', flex: 1 },
    {
        field: 'model',
        headerName: 'Modelo o portamolde',
        minWidth: 200,
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
            <Link to={`${ROUTES.detailProduct}/${params.row.id}`}>
                <IconButton>
                    <RemoveRedEyeIcon />
                </IconButton>
            </Link>
        ),
    },
];

type FieldTable = Partial<definitions['product']>;
type ShowTable = { imgRef: boolean; model: boolean };



const Products: React.FC = () => {
    const location = useLocation();
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });
    const [rows, setRows] = React.useState<FieldTable[]>(() => []);
    const [rowHeight, setRowHeight] = React.useState<number>(40);
    const [colTable, setColTable] = React.useState<ShowTable>({ imgRef: false, model: false });
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    React.useEffect(() => {
        const state = location.state as { status: string } | null;
        switch (state?.status) {
            case 'success':
                setModal({ isOpen: true, message: 'Producto creado' });
                break;
            case 'update':
                setModal({ isOpen: true, message: 'Producto actualizado' });
                break;
        }
    }, [location]);

    React.useEffect(() => {
        supabase
            .from<definitions['product']>('product')
            .select('*')
            .then(({ data }) => {
                if (data && data.length) {
                    data.forEach((item) => {
                        setRows((pre) => [...pre, item]);
                    });
                }
            });
    }, []);

    React.useEffect(() => {
        if (matches) {
            setRowHeight(160);
            setColTable({ imgRef: true, model: true });
        } else {
            setColTable({ imgRef: false, model: false });
            setRowHeight(40);
        }
    }, [matches]);

    return (
        <Marco title="Productos" to={ROUTES.product}>
            <Container maxWidth="lg" sx={{ pt: 4, display: 'flex', pb: 4 }} className="flex-col h-full">
                <Box className="flex flex-row-reverse mb-6">
                    <Link to={ROUTES.newProduct}>
                        <Button variant="contained">Crear producto</Button>
                    </Link>
                </Box>

                <Paper elevation={3} sx={{ p: 3, width: '100%' }} className="flex-1">
                    <DataGrid
                        disableSelectionOnClick={true}
                        columnVisibilityModel={colTable}
                        rowHeight={rowHeight}
                        columns={columns}
                        rows={rows}
                        rowsPerPageOptions={[5, 10, 50]}
                        pageSize={10}
                    />
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
