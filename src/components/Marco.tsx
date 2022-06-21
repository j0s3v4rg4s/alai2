import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface MarcoProps {
    children?: React.ReactNode;
    title: string;
    to: string;
}

const Marco: React.FC<MarcoProps> = (props) => {
    return (
        <Box className="flex flex-col h-screen">
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to={props.to}>{props.title}</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box className="flex-1 overflow-auto">{props.children}</Box>
        </Box>
    );
};

export default Marco;
