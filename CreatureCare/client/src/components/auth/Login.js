import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../modules/authManager";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Player } from "@lottiefiles/react-lottie-player";

export default function Login() {
    const navigate = useNavigate();

    // variables are initially rendered as empty states
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password!"));
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
                    padding={4}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc",
                        },
                    }}

                >
                    <Player
                        src='https://assets9.lottiefiles.com/private_files/lf30_ISHFyg.json'
                        className="player"
                        loop
                        autoplay
                        style={{
                            height: '100px',
                            width: '110px',
                        }}
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

                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        sx={{ marginTop: 2, borderRadius: 3 }}
                        endIcon={<VpnKeyIcon />}
                        onClick={(event) => { loginSubmit(event) }}
                    >
                        Login
                    </Button>

                    <Button
                        sx={{ marginTop: 2, borderRadius: 3 }}
                        onClick={() => { navigate(`/register`) }}
                    >
                        Need to Register?
                    </Button>

                </Box>
            </form>
        </>
    );
}