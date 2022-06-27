import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Button from 'components/Button';
import Marco from 'components/Marco';
import Message from 'components/Message';
import ProductForm, { InputsProduct } from 'components/ProductForm';
import { ROUTES } from 'constants/routes.constant';
import { collection, doc, setDoc } from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import { ProductModel } from 'models/product.model';
import { uploadFile } from 'utils/fileManager';
import { firestore as db } from 'utils/firebase';

const NewProduct = () => {
    const [isValid, setIsValid] = React.useState<boolean>();
    const [load, setLoad] = React.useState<boolean>(false);
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

    const navigate = useNavigate();

    const onSubmit = async (data: InputsProduct) => {
        try {
            setLoad(true);
            let ref: StorageReference | undefined;
            ref = data.file.length ? await uploadFile(`/images/products/${data.code}`, data.file[0]) : undefined;
            const product: ProductModel = {
                code: data.code,
                reference: data.reference,
                description: data.description,
                client: data.client,
                model: data.model,
                imgRef: ref?.fullPath || null,
                id: '',
            };
            const refCollection = doc(collection(db, 'products'));
            product.id = refCollection.id;
            await setDoc(refCollection, product);
            setLoad(false);
            navigate(ROUTES.product, { state: { status: 'success' } });
        } catch (error) {
            console.log(error);
            setLoad(false);
            setModal({ isOpen: true, message: 'Hubo un error' });
        }
    };

    return (
        <Marco title="Productos" to={ROUTES.product}>
            <Container maxWidth="lg" className="py-4">
                <h1 className="text-3xl sm:text-5xl">Crear producto</h1>
                <ProductForm onValid={(valid) => setIsValid(valid)} submit={(data) => onSubmit(data)}>
                    <Box className="flex flex-row-reverse mt-4">
                        <Button
                            sx={{ minWidth: 130 }}
                            variant="contained"
                            type="submit"
                            disabled={!isValid}
                            load={load}
                        >
                            Crear
                        </Button>
                    </Box>
                </ProductForm>
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

export default NewProduct;
