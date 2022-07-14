import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Button from 'components/Button';
import ConfirmDialog from 'components/ConfirmDialog';
import Marco from 'components/Marco';
import Message from 'components/Message';
import ProductForm, { InputsProduct } from 'components/ProductForm';
import { ROUTES } from 'constants/routes.constant';
import { STORAGE } from 'constants/storage.constants';
import { TABLE_NAME } from 'constants/table.constants';
import { definitions } from 'types/supabase';
import { supabase, useGetRows } from 'utils/superbase';

const ProductDetail = () => {
    const [load, setLoad] = React.useState<boolean>(false);
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });
    const [isConfirm, setIsConfirm] = React.useState<boolean>(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const product = useGetRows<definitions['product']>(TABLE_NAME.product, 'id', id);

    const handleSubmit = async (data: InputsProduct) => {
        try {
            setLoad(true);
            let ref: string | undefined;
            if (data.file.length && product?.[0]?.imgRef) {
                await supabase.storage.from(STORAGE.bucketName).update(`products/${id}`, data.file[0]);
                ref = `products/${id}`;
            } else if (data.file.length) {
                await supabase.storage.from(STORAGE.bucketName).upload(`products/${id}`, data.file[0]);
                ref = `products/${id}`;
            }

            await supabase
                .from<definitions['product']>(TABLE_NAME.product)
                .update({ code: data.code, imgRef: ref, model: data.model, description: data.description })
                .eq('id', id);

            setLoad(false);
            navigate(ROUTES.product, { state: { status: 'update' } });
        } catch (e) {
            console.log(e);
            setLoad(false);
            setModal({ isOpen: true, message: 'Hubo un error' });
        }
    };

    const handleDelete = async () => {
        setIsConfirm(false);
        setLoad(true);
        await supabase.from<definitions['product']>(TABLE_NAME.product).delete().eq('id', id);
        if (product?.[0].imgRef) {
            await supabase.storage.from(STORAGE.bucketName).remove([product[0].imgRef]);
        }
        setLoad(false);
        navigate(ROUTES.product);
    };
    return (
        <Marco title="Productos" to={ROUTES.product}>
            <Container maxWidth="lg" className="py-4">
                <Toolbar>
                    <IconButton edge="start" onClick={() => navigate(ROUTES.product, { replace: true })}>
                        <ArrowBackIcon />
                    </IconButton>
                    <h1 className="text-3xl sm:text-2xl">Detalle producto</h1>
                </Toolbar>
                {product ? (
                    <ProductForm product={product[0]} submit={(data) => handleSubmit(data)}>
                        <Box className="flex flex-row-reverse mt-4 gap-4">
                            <Button variant="contained" type="submit" load={load}>
                                actualizar
                            </Button>
                            <Button variant="contained" type="button" color="error" onClick={() => setIsConfirm(true)}>
                                Eliminar
                            </Button>
                        </Box>
                    </ProductForm>
                ) : (
                    <Box className="flex justify-center">
                        <CircularProgress />
                    </Box>
                )}
            </Container>
            <Message
                actionColor="error"
                message={modal.message}
                open={modal.isOpen}
                close={() => setModal({ ...modal, isOpen: false })}
            />
            <ConfirmDialog
                title="Eliminar producto"
                isOpen={isConfirm}
                onCancel={() => setIsConfirm(false)}
                onConfirm={handleDelete}
            >
                <span className="text-lg">¿Está seguro que quiere eliminar el producto?</span>
            </ConfirmDialog>
        </Marco>
    );
};

export default ProductDetail;
