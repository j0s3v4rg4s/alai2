import * as React from 'react';

import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';

import Marco from 'components/Marco';
import ProductForm from 'components/ProductForm';
import { ROUTES } from 'constants/routes.constant';

const ProductDetail = () => {
    const { id } = useParams();
    React.useEffect(() => {
        console.log(id);
    }, [id]);
    return (
        <Marco title="Productos" to={ROUTES.product}>
            <Container maxWidth="lg" className="py-4">
                <h1 className="text-3xl sm:text-5xl">Detalle producto</h1>
                <ProductForm />
            </Container>
        </Marco>
    );
};

export default ProductDetail;
