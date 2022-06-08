import * as React from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

interface MarcoProps {
    children?: React.ReactNode;
}

const Marco: React.FC<MarcoProps> = (props) => {
    return <Box>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Productos
                </Typography>
            </Toolbar>
        </AppBar>
        <Box>
            {props.children}
        </Box>
    </Box>;
}

export default Marco;
