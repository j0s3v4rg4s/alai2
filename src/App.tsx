import React from 'react';

import './App.css';
import { ThemeProvider } from '@mui/material/styles';

import { THEME } from 'constants/theme';
import Products from 'pages/Products';

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <Products />
        </ThemeProvider>
    );
}

export default App;
