import React from 'react';
import { Route,Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import { ROUTES } from 'constants/routes.constant';
import { THEME } from 'constants/theme';
import ProductDetail from 'pages/ProductDetail';
import Products from 'pages/Products';

import NewProduct from './pages/NewProduct';

import './App.css';

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <Routes>
                <Route path={ROUTES.product} element={<Products />} />
                <Route path={ROUTES.newProduct} element={<NewProduct />} />
                <Route path={`${ROUTES.detailProduct}/:id`} element={<ProductDetail />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
