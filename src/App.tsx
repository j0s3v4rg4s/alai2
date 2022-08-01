import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import { ROUTES } from 'constants/routes.constant';
import { THEME } from 'constants/theme';
import Client from 'pages/Client';
import ClientDetails from 'pages/ClientDetails';
import NewClient from 'pages/NewClient';
import ProductDetail from 'pages/ProductDetail';
import Products from 'pages/Products';

import NewProduct from './pages/NewProduct';

import './App.css';

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <Routes>
                <Route path={ROUTES.product} element={<Products />} />
                <Route path={ROUTES.client} element={<Client />} />
                <Route path={`${ROUTES.client}/:id`} element={<ClientDetails />} />
                <Route path={ROUTES.newClient} element={<NewClient />} />
                <Route path={ROUTES.newProduct} element={<NewProduct />} />
                <Route path={`${ROUTES.detailProduct}/:id`} element={<ProductDetail />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
