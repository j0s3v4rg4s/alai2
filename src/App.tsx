import React from 'react';

import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';

import { THEME } from 'constants/theme';
import Products from 'pages/Products';
import NewProduct from './pages/NewProduct';
import { ROUTES } from './constants/routes.constant';

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <Routes>
                <Route path={ROUTES.product} element={<Products />} />
                <Route path={ROUTES.newProduct} element={<NewProduct />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
