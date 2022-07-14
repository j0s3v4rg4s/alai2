import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Button from 'components/Button';
import Marco from 'components/Marco';
import Message from 'components/Message';
import ProductForm, { InputsProduct } from 'components/ProductForm';
import { ROUTES } from 'constants/routes.constant';
import { STORAGE } from 'constants/storage.constants';
import { TABLE_NAME } from 'constants/table.constants';
import { definitions } from 'types/supabase';
import { supabase } from 'utils/superbase';

const NewProduct = () => {
    const [isValid, setIsValid] = React.useState<boolean>();
    const [load, setLoad] = React.useState<boolean>(false);
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

    const navigate = useNavigate();

    const onSubmit = async (data: InputsProduct) => {
        try {
            setLoad(true);
            await supabase.storage.getBucket('tempo');

            const resultDb = await supabase.from<definitions['product']>(TABLE_NAME.product).insert([
                {
                    code: data.code,
                    description: data.description,
                    model: data.model,
                },
            ]);

            if (resultDb.error) {
                console.log(resultDb.error);
                setModal({ isOpen: true, message: 'Hubo un error' });
                setLoad(false);
                return;
            }

            if (data.file.length) {
                const path = `products/${resultDb.data[0].id}`;
                const resultStorage = await supabase.storage.from(STORAGE.bucketName).upload(path, data.file[0]);
                await supabase
                    .from<definitions['product']>(TABLE_NAME.product)
                    .update({ imgRef: path })
                    .eq('id', resultDb.data[0].id);
                if (resultStorage.error) {
                    console.log(resultStorage.error);
                    await supabase
                        .from<definitions['product']>(TABLE_NAME.product)
                        .delete()
                        .eq('id', resultDb.data[0].id);
                    setLoad(false);
                    setModal({ isOpen: true, message: 'Hubo un error subiendo la imagen' });
                    return;
                }
            }

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
                <Toolbar>
                    <IconButton edge="start" onClick={() => navigate(ROUTES.product, { replace: true })}>
                        <ArrowBackIcon />
                    </IconButton>
                    <h1 className="text-3xl sm:text-2xl">Crear producto</h1>
                </Toolbar>
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
