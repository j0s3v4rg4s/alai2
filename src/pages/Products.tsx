import * as React from 'react';

import Marco from 'components/Marco';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const Products: React.FC = () => {
    return <Marco>
        <Container maxWidth="xl" sx={{mt: 4}}>
            <Paper elevation={3} sx={{p: 3}}>
                hola
            </Paper>
        </Container>

    </Marco>
};

export default Products;
