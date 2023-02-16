import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                fullName,
                email,
            };
            register(userProfile, password)
                .then(() => navigate("/"))
                .catch(() => alert("Please fill out the entire form!"));
        }
    };

    return (
        <>
            <form>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    alignitems="center"
                    justifyContent={'center'}
                    margin="auto"
                    padding={3}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc",
                        },
                    }}

                >
                    <Typography variant="h4" padding={1} textAlign="center">
                        <b>Register</b>
                    </Typography>

                    <TextField
                        margin="dense"
                        type={'fullName'}
                        variant="outlined"
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        type={'email'}
                        variant="outlined"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        type={'password'}
                        variant="outlined"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        type={'confirmPassword'}
                        variant="outlined"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        sx={{ marginTop: 2, borderRadius: 3 }}
                        endIcon={<VpnKeyIcon />}
                        onClick={(event) => { registerClick(event) }}
                    >
                        Register
                    </Button>

                    <Button
                        sx={{ marginTop: 2, borderRadius: 3 }}
                        onClick={() => { navigate(`/login`) }}
                    >
                        Login
                    </Button>

                </Box>
            </form>
        </>
    );
}