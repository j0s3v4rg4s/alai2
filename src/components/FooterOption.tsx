import * as React from 'react';

import Box from '@mui/material/Box';

import Button from './Button';

export interface FooterOptionProps {
    cancel?: () => void;
    update?: () => void;
}

const FooterOption: React.FC<FooterOptionProps> = ({ update, cancel }) => {
    return (
        <>
            <Box className="flex-1"></Box>
            <Button color="error" variant="text" onClick={() => cancel?.()} sx={{marginRight: 3}}>
                borrar
            </Button>
            <Button color="primary" variant="contained" onClick={() => update?.()}>
                actualizar
            </Button>
        </>
    );
};

export default FooterOption;
