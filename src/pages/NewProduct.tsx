import * as React from 'react';
import Marco from '../components/Marco';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';

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
    file: File;
};

const NewProduct = () => {
    const [url, setUrl] = React.useState<string>();

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<Inputs>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    const onImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url2 = URL.createObjectURL(file);
            console.log(url);
            setUrl(url2);
        }
    };

    return (
        <Marco>
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
                        <Button sx={{ minWidth: 130 }} variant="contained" type="submit" disabled={!isValid}>
                            Crear
                        </Button>
                    </Box>
                </form>
            </Container>
        </Marco>
    );
};

export default NewProduct;
