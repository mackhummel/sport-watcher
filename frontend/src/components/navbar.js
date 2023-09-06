import React from 'react';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import Logo from '../images/Sports Watcher-logos_white.png'
import { LogoutOutlined } from '@mui/icons-material';


const NavBar = (props) => {
    const { signOut } = props;
    return (
        <AppBar position="static" sx={{ marginBottom: 2 }}>
            <Toolbar >
                <Box
                    component="img"
                    sx={{ height: "40px", width: "auto", mr: 1 }}
                    src={Logo}
                />
                {signOut ? <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                    <IconButton
                        onClick={signOut}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Box> : null}
            </Toolbar>

        </AppBar>
    )
}

export default NavBar;