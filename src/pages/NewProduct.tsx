import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Marco from '../components/Marco';
import Button from 'components/Button';
import { uploadFile } from 'utils/fileManager';
import { firestore as db } from 'utils/firebase';

import Message from 'components/Message';
import { ROUTES } from 'constants/routes.constant';

const theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: '100%',
                },
                multiline: {
                    height: '100%',
                },
            },
        },
    },
});

type Inputs = {
    code: string;
    reference: string;
    description: string;
    client: string;
    model: string;
    file: FileList;
};

const NewProduct = () => {
    const [url, setUrl] = React.useState<string>();
    const [load, setLoad] = React.useState<boolean>(false);
    const [modal, setModal] = React.useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: '' });

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<Inputs>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setLoad(true);
            const ref = await uploadFile(`/images/products/${data.code}`, data.file[0]);
            const product = {
                code: data.code,
                reference: data.reference,
                description: data.description,
                client: data.client,
                model: data.model,
                imgRef: ref.fullPath,
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

    const onImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setUrl(urlImage);
        }
    };

    return (
        <Marco title="Productos" to={ROUTES.product}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <h1 className="text-3xl sm:text-5xl">Crear producto</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mt: 4 }} className="grid grid-cols-1 sm:grid-cols-6 gap-4 justify-items-center">
                        <ThemeProvider theme={theme}>
                            <label className="relative sm:col-span-2 sm:row-span-3 w-64 h-64 sw:w-80 sw:h-80 rounded-xl border-4 border-gray-400 border-dashed flex justify-center items-center">
                                {url ? (
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div>
                                        <p>Seleccionar imagen</p>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    className="absolute w-0 h-0"
                                    {...register('file', { required: true })}
                                    onChange={onImageChange}
                                />
                            </label>
                            <TextField
                                {...register('code', { required: true })}
                                className="sm:col-span-2 w-full"
                                label="Código"
                                variant="outlined"
                            />
                            <TextField
                                {...register('reference', { required: true })}
                                className="sm:col-span-2 w-full"
                                label="Referencia"
                                variant="outlined"
                            />
                            <TextField
                                {...register('description', { required: true })}
                                className="sm:col-span-2 sm:row-span-2 w-full h-full"
                                label="Descripción"
                                multiline
                                rows={5}
                                variant="outlined"
                            />
                            <TextField
                                {...register('client', { required: true })}
                                className="sm:col-span-2 w-full"
                                label="Cliente"
                                variant="outlined"
                            />
                            <TextField
                                {...register('model', { required: true })}
                                className="sm:col-span-2 w-full"
                                label="Modelo o portamolde"
                                variant="outlined"
                            />
                        </ThemeProvider>
                    </Box>

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
                </form>
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
