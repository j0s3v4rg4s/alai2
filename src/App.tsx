import React from 'react';
import './App.css';
import {StyledEngineProvider} from '@mui/material/styles';
import Products from 'pages/Products';
import {ThemeProvider} from '@mui/material/styles';
import {THEME} from 'constants/theme';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={THEME}>
                <Products/>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
