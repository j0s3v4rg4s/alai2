import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AlertColor } from '@mui/material/Alert';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import ClientForm, { ClientInput } from 'components/ClientForm';
import ClientProductTable, { AddProductInput, ProductClient } from 'components/ClientProductTable';
import ConfirmDialog from 'components/ConfirmDialog';
import FooterOption from 'components/FooterOption';
import Marco from 'components/Marco';
import Message from 'components/Message';
import { ROUTES } from 'constants/routes.constant';
import { TABLE_NAME } from 'constants/table.constants';
import { definitions } from 'types/supabase';
import { supabase, useGetRows } from 'utils/superbase';

const ClientDetails = () => {
    const { id } = useParams();
    const [productClient, setProductClient] = React.useState<ProductClient[]>([]);
    const [action, setAction] = React.useState<{ color: AlertColor; message: string; isOpen: boolean }>({
        isOpen: false,
        message: '',
        color: 'info',
    });
    const client = useGetRows<definitions['client']>(TABLE_NAME.client, 'id', id)?.[0];
    const navigate = useNavigate();
    const clientForm = useForm<ClientInput>({
        defaultValues: {
            name: '.',
            nit: '.',
        },
    });
    const [isConfirm, setIsConfirm] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (client) {
            clientForm.setValue('name', client.name!);
            clientForm.setValue('nit', client.nit!);
        }
    }, [client, clientForm]);

    React.useEffect(() => {
        supabase
            .from(TABLE_NAME.clientProduct)
            .select('*, product!inner(*)')
            .eq('client', id)
            .then(({ data, error }) => {
                if (error) {
                    console.log(error);
                } else {
                    const clientProd: ProductClient[] = data?.map((value) => ({
                        reference: value.reference,
                        product: value.product,
                        id: value.id,
                    }));
                    setProductClient(clientProd);
                }
            });
    }, [id]);

    const handleAddProduct = (product: AddProductInput) => {
        const existProd = productClient.find((prod) => prod.product?.id === product.product?.id);
        if (existProd) {
            setAction({ isOpen: true, message: 'El producto ya existe', color: 'error' });
        } else {
            setProductClient((prevState) => [
                ...prevState,
                { product: product.product!, reference: product.reference },
            ]);
            supabase
                .from<definitions['client_product']>(TABLE_NAME.clientProduct)
                .insert({
                    client: id,
                    product: product.product?.id,
                    reference: product.reference,
                })
                .then(({ data, error }) => {
                    if (error) {
                        console.log(error);
                    }
                });
        }
    };

    const handleRemoveProduct = async (product: ProductClient) => {
        const { error } = await supabase
            .from<definitions['client_product']>(TABLE_NAME.clientProduct)
            .delete()
            .eq('id', product.id!);
        if (error) {
            setAction({ isOpen: true, message: 'No se pudo eliminar el producto', color: 'error' });
        } else {
            const newProd = productClient.filter((pro) => pro.product?.id !== product.product?.id);
            setProductClient(newProd);
        }
    };

    const confirmRemoveClient = async () => {
        setIsConfirm(true);
    };

    const handleRemoveClient = async () => {
        setIsConfirm(false);
        const { error } = await supabase.from(TABLE_NAME.client).delete().eq('id', id);
        if (error) {
            console.log(error);
            setAction({ isOpen: true, message: 'No se pudo eliminar el cliente', color: 'error' });
        }
        navigate(ROUTES.client, { replace: true });
    };

    const handleSaveClient = () => {
        clientForm.handleSubmit(async (data) => {
            const error = await supabase.from(TABLE_NAME.client).update({
                name: data.name,
                nit: data.nit,
            });
            if (error) {
                console.log(error);
                setAction({ isOpen: true, message: 'No se pudo actualizar el cliente', color: 'error' });
            }
            navigate(ROUTES.client, { replace: true });
        })();
    };

    return (
        <Marco
            title="Clientes"
            to={ROUTES.client}
            footer={<FooterOption cancel={confirmRemoveClient} update={handleSaveClient} />}
        >
            <Toolbar>
                <IconButton edge="start" onClick={() => navigate(ROUTES.client, { replace: true })}>
                    <ArrowBackIcon />
                </IconButton>
                <h1 className="text-3xl sm:text-2xl">Detalle cliente</h1>
            </Toolbar>

            <Container maxWidth="lg" className="py-4">
                <ClientForm clientForm={clientForm} />
                <ClientProductTable
                    productsClient={productClient}
                    addProduct={handleAddProduct}
                    removeProduct={handleRemoveProduct}
                />
            </Container>
            <Message
                open={action.isOpen}
                actionColor={action.color}
                message={action.message}
                close={() => setAction((prevState) => ({ ...prevState, isOpen: false }))}
                autoHideDuration={4000}
            />
            <ConfirmDialog
                title="Eliminar Cliente"
                isOpen={isConfirm}
                onCancel={() => setIsConfirm(false)}
                onConfirm={handleRemoveClient}
            >
                <span className="text-lg">¿Está seguro que quiere eliminar el cliente?</span>
            </ConfirmDialog>
        </Marco>
    );
};

export default ClientDetails;
