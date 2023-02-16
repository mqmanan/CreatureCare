import React, { useState } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography, Menu, MenuItem } from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Stack } from '@mui/system';
import { NavLink as RRNavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import { logout } from '../../modules/authManager';

export default function NavBar({ isLoggedIn, userProfile }) {
    const navigate = useNavigate();

    // state for dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);

    // control open/close dropdown menu
    const open = Boolean(anchorEl);

    // dealing with dropdown menu
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    onClick={() => { navigate("/") }}
                    aria-label='logo'>
                    <CatchingPokemonIcon />
                </IconButton>
                <Typography variant='h6' component='div' href="/" sx={{ flexGrow: 1 }}>
                    CreatureCare
                </Typography>

                {isLoggedIn &&
                    <Stack direction='row' spacing={1}>
                        <Button
                            tag={RRNavLink}
                            color='inherit'
                            aria-controls="records-menu"
                            aria-haspopup="true"
                            area-expanded={open ? "true" : undefined}
                            onClick={handleClick}>
                            Directory
                        </Button>

                        <Menu
                            id="records-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={(event) => {
                                    handleClose(event)
                                    navigate("/appointments")
                                }}>
                                Appointments
                            </MenuItem>
                            <MenuItem
                                onClick={(event) => {
                                    handleClose(event)
                                    navigate("/patients")
                                }}>
                                Patient Records
                            </MenuItem>
                            <MenuItem
                                onClick={(event) => {
                                    handleClose(event)
                                    navigate("/patients/add")
                                }}>
                                Add Patient
                            </MenuItem>
                        </Menu>

                        <Button
                            tag={RRNavLink}
                            color='inherit'
                            onClick={() => { navigate("/staff") }}>
                            Staff
                        </Button>

                        <Button
                            tag={RRNavLink}
                            color='inherit'
                            onClick={() => { navigate("/appointments/add") }}>
                            Schedule
                        </Button>
                        <Button
                            tag={RRNavLink}
                            color='inherit'
                            startIcon={<AccountCircleIcon />}
                            onClick={() => { navigate("/profile") }}>
                            Profile
                        </Button>

                        <Button
                            tag={RRNavLink}
                            color='inherit'
                            startIcon={<LogoutIcon />}
                            onClick={(event) => {
                                logout(event)
                                navigate("/login")
                            }}
                        >
                            Logout
                        </Button>
                    </Stack>
                }

                {!isLoggedIn &&
                    <Button
                        tag={RRNavLink}
                        color='inherit'
                        startIcon={<LockIcon />}
                        onClick={() => { navigate("/login") }}>
                        Login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    );
}