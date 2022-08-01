import * as React from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Menu from 'components/Menu';

import 'css/marco.css';

interface MarcoProps {
    children?: React.ReactNode;
    footer?: React.ReactNode;
    title: string;
    to: string;
}

const drawerWidth = 200;

const Marco: React.FC<MarcoProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);
    return (
        <Box className="Marco flex">
            <Box component="nav" sx={{ width: { md: drawerWidth } }}>
                <Drawer
                    anchor="left"
                    variant="temporary"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Menu />
                </Drawer>
                <Drawer
                    anchor="left"
                    open
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Menu />
                </Drawer>
            </Box>
            <Box
                className="flex flex-col flex-1"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            sx={{ display: { xs: 'block', md: 'none' } }}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to={props.to}>{props.title}</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box className="flex-1 overflow-auto">{props.children}</Box>
            </Box>
            {props.footer && (
                <AppBar
                    position="fixed"
                    color="inherit"
                    sx={{ top: 'auto', bottom: 0, right: 0, width: { md: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar>{props.footer}</Toolbar>
                </AppBar>
            )}
        </Box>
    );
};

export default Marco;
