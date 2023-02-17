import { Player } from "@lottiefiles/react-lottie-player";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { me } from "../../modules/authManager";

export default function Hello() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        me().then(setUserProfile);
    }, []);

    return (
        <>
            <Box
                sx={{
                    padding: '0px'
                }}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >

                    <Grid container direction="column" item xs={12} md={6}>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItem: "end"
                            }}>

                            <Typography
                                variant="h3"
                                align="center"
                                mb={1}
                            >


                            </Typography>

                        </Grid>

                        <Grid
                            item
                            spacing={3}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItem: "end"
                            }} >

                            <Player
                                src='https://assets3.lottiefiles.com/packages/lf20_lb6Gsk.json'
                                className="player"
                                loop
                                autoplay
                                style={{
                                    height: '450px',
                                    width: '450px',
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container direction="column" item xs={12} md={6}>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "flex-center",
                                alignItem: "center"
                            }} >
                            <Typography variant="h3" align="left">
                                Welcome {userProfile.fullName}!<br></br>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItem: "left"
                            }} >
                            <Typography
                                variant="h5"
                                align="left"
                                mb={1}
                            >

                                This application will help any organization organize<br>
                                </br>& manage their files, appointments, & clients.


                            </Typography></Grid>

                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "flex-center",
                                alignItem: "left"
                            }} >
                            <Typography variant="h3" align="center">

                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}