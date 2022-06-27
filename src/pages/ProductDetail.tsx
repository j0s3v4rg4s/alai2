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
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import * as _ from 'lodash';
import { ProductModel } from 'models/product.model';
import { uploadFile } from 'utils/fileManager';
import { getReference, useDoc } from 'utils/firestore';

const ProductDetail = () => {
    const [load, setLoad] = React.useState<boolean>(false);
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });
    const [isConfirm, setIsConfirm] = React.useState<boolean>(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const snap = useDoc<ProductModel>('products', id!);

    const product = snap?.data();

    const handleSubmit = async (data: InputsProduct) => {
        try {
            setLoad(true);
            let ref: StorageReference | undefined;
            if (data.file.length && product?.imgRef) {
                ref = await uploadFile(product.imgRef, data.file[0]);
            } else if (data.file.length) {
                ref = await uploadFile(`/images/products/${data.code}`, data.file[0]);
            }
            const productUpdate: ProductModel = {
                code: data.code,
                reference: data.reference,
                description: data.description,
                client: data.client,
                model: data.model,
                imgRef: ref?.fullPath || product?.imgRef || null,
                id: id!,
            };

            const isEq = _.isEqual(productUpdate, product);
            if (!isEq) {
                const refProduct = getReference<ProductModel>('products', id!);
                await updateDoc(refProduct, productUpdate);
            }
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
        const refProduct = getReference('products', id!);
        await deleteDoc(refProduct);
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
                    <ProductForm product={product} submit={(data) => handleSubmit(data)}>
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
