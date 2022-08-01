import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import ConfirmDialog from 'components/ConfirmDialog';
import { TABLE_NAME } from 'constants/table.constants';
import { definitions } from 'types/supabase';
import { supabase } from 'utils/superbase';

export interface AddProductInput {
    product: definitions['product'] | null;
    reference: string;
}

export interface ProductClient {
    product: definitions['product'] | undefined;
    reference: string;
    id?: string;
}

export interface ClientProductTableProps {
    productsClient: ProductClient[];
    addProduct?: (product: AddProductInput) => void;
    removeProduct?: (product: ProductClient) => void;
}

const ClientProductTable: React.FC<ClientProductTableProps> = (props) => {
    const [isConfirm, setIsConfirm] = React.useState<boolean>(false);
    const [deleteProduct, setDeleteProduct] = React.useState<ProductClient>();
    const { productsClient, addProduct } = props;
    const [products, setProducts] = React.useState<definitions['product'][]>([]);
    const productForm = useForm<AddProductInput>({
        defaultValues: {
            product: null,
        },
    });
    const handleAddProduct = (data: AddProductInput) => {
        addProduct?.(data);
        productForm.reset();
    };

    React.useEffect(() => {
        supabase
            .from<definitions['product']>(TABLE_NAME.product)
            .select('*')
            .then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    setProducts(data);
                }
            });
    }, []);

    const deleteProd = (product: ProductClient) => {
        setIsConfirm(true);
        setDeleteProduct(product);
    };

    return (
        <>
            <h2 className="text-xl mt-6 mb-4">Productos</h2>
            <form
                className="grid FormProduct gap-3 sm:gap-4 sm:flex align-middle"
                onSubmit={productForm.handleSubmit(handleAddProduct)}
            >
                <Controller
                    control={productForm.control}
                    rules={{ required: true }}
                    render={({ field }) => {
                        return (
                            <Autocomplete
                                {...field}
                                onChange={(value, newValue) => field.onChange(newValue)}
                                value={field.value}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                noOptionsText="Sin resultados"
                                getOptionLabel={(option) => option.code}
                                sx={{ minWidth: { sm: 200 } }}
                                renderInput={(param) => <TextField {...param} label="Producto" />}
                                options={products}
                            />
                        );
                    }}
                    name="product"
                />

                <TextField label="Referencia" variant="outlined" {...productForm.register('reference')} />
                <IconButton color="primary" type="submit">
                    <AddCircleOutlineRoundedIcon />
                </IconButton>
            </form>

            <TableContainer component={Paper} className="mt-6">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell>Referencia</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsClient.map((pro) => (
                            <TableRow key={pro.product?.id}>
                                <TableCell>{pro.product?.code}</TableCell>
                                <TableCell>{pro.reference}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteProd(pro)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmDialog
                title="Eliminar producto"
                isOpen={isConfirm}
                onCancel={() => setIsConfirm(false)}
                onConfirm={() => {
                    props.removeProduct?.(deleteProduct!)
                    setIsConfirm(false)
                }}
            >
                <span className="text-lg">¿Está seguro que quiere eliminar el producto?</span>
            </ConfirmDialog>
        </>
    );
};

export default ClientProductTable;
