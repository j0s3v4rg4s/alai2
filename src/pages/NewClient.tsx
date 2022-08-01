import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Button from 'components/Button';
import ClientForm, { ClientInput } from 'components/ClientForm';
import ClientProductTable, { AddProductInput, ProductClient } from 'components/ClientProductTable';
import Marco from 'components/Marco';
import Message from 'components/Message';
import { ROUTES } from 'constants/routes.constant';
import { TABLE_NAME } from 'constants/table.constants';
import { definitions } from 'types/supabase';
import { supabase } from 'utils/superbase';

const NewClient = () => {
    const [productClient, setProductClient] = React.useState<ProductClient[]>([]);
    const navigate = useNavigate();
    const clientForm = useForm<ClientInput>();
    const [action, setAction] = React.useState<{ color: AlertColor; message: string; isOpen: boolean }>({
        isOpen: false,
        message: '',
        color: 'info',
    });

    const onSubmit = () => {
        clientForm.handleSubmit(async (data) => {
            const respondClient = await supabase
                .from<definitions['client']>(TABLE_NAME.client)
                .insert({ name: data.name, nit: data.nit });

            if (respondClient.error) {
                console.error(respondClient.error);
            }

            if (productClient.length) {
                const productClientInsert = productClient.map((product) => ({
                    reference: product.reference,
                    product: product.product?.id,
                    client: respondClient?.data?.[0]?.id,
                }));
                const respondProduct = await supabase
                    .from<definitions['client_product']>(TABLE_NAME.clientProduct)
                    .insert(productClientInsert);

                if (respondProduct.error) {
                    console.error(respondProduct.error);
                }
            }
            navigate(ROUTES.client, { replace: true });
        })();
    };

    const handleAddProduct = (data: AddProductInput) => {
        const prod = productClient.find((product) => product.product?.id === data.product?.id);
        if (prod) {
            setAction({ isOpen: true, color: 'error', message: 'El producto ya existe' });
            return;
        }
        const prodClient: ProductClient = { product: data.product!, reference: data.reference };
        setProductClient((prev) => [...prev, prodClient]);
    };

    return (
        <Marco
            title="Clientes"
            to={ROUTES.client}
            footer={
                <>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="primary" variant="contained" onClick={onSubmit}>
                        Crear
                    </Button>
                </>
            }
        >
            <Toolbar>
                <IconButton edge="start" onClick={() => navigate(ROUTES.client, { replace: true })}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 className="text-3xl sm:text-2xl">Crear cliente</h1>
            </Toolbar>
            <Container maxWidth="lg" className="py-4">
                <ClientForm clientForm={clientForm} />
                <ClientProductTable productsClient={productClient} addProduct={handleAddProduct} />
            </Container>
            <Message
                open={action.isOpen}
                actionColor={action.color}
                message={action.message}
                close={() => setAction((prevState) => ({ ...prevState, isOpen: false }))}
                autoHideDuration={4000}
            />
        </Marco>
    );
};

export default NewClient;
