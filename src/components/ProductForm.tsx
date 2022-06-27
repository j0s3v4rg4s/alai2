import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createTheme } from '@mui/material';

export type InputsProduct = {
    code: string;
    reference: string;
    description: string;
    client: string;
    model: string;
    file: FileList;
};

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

export interface ProductFormProps {
    onValid?: (isValid: boolean) => void;
    submit?: (data: InputsProduct) => void;
    children?: React.ReactNode;
}

const ProductForm: React.FC<ProductFormProps> = (props) => {
    const [url, setUrl] = React.useState<string>();
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<InputsProduct>({ mode: 'onChange' });

    const onImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setUrl(urlImage);
        }
    };

    const onSubmit: SubmitHandler<InputsProduct> = (data) => {
        props.submit?.(data);
    };

    React.useEffect(() => {
        props.onValid?.(isValid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid]);

    return (
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
                            {...register('file')}
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
            {props.children}
        </form>
    );
};

export default ProductForm;
