import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import Button from 'components/Button';
import Marco from 'components/Marco';
import Message from 'components/Message';
import ProductForm, { InputsProduct } from 'components/ProductForm';
import { ROUTES } from 'constants/routes.constant';
import { updateDoc } from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import * as _ from 'lodash';
import { ProductModel } from 'models/product.model';
import { uploadFile } from 'utils/fileManager';
import { getReference, useDoc } from 'utils/firestore';

const ProductDetail = () => {
    const [load, setLoad] = React.useState<boolean>(false);
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

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
            if(!isEq) {
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
    return (
        <Marco title="Productos" to={ROUTES.product}>
            <Container maxWidth="lg" className="py-4">
                <h1 className="text-3xl sm:text-5xl">Detalle producto</h1>
                {product ? (
                    <ProductForm product={product} submit={(data) => handleSubmit(data)}>
                        <Box className="flex flex-row-reverse mt-4 gap-4">
                            <Button variant="contained" type="submit" load={load}>
                                actualizar
                            </Button>
                            <Link to={ROUTES.product}>
                                <Button variant="contained" type="button" color="inherit">
                                    regresar
                                </Button>
                            </Link>
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
        </Marco>
    );
};

export default ProductDetail;
