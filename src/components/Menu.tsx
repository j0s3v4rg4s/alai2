import * as React from 'react';
import { Link } from 'react-router-dom';

import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';

import { ROUTES } from 'constants/routes.constant';

const options = [
    { name: 'Clientes', icon: <PersonIcon />, url: ROUTES.client },
    { name: 'Productos', icon: <CategoryIcon />, url: ROUTES.product },
];

const Menu = () => {
    return (
        <Box>
            <Toolbar />
            <Divider />

            <List>
                {options.map((option, i) => (
                    <Link to={option.url} key={i}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{option.icon}</ListItemIcon>
                                <ListItemText primary={option.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );
};

export default Menu;
