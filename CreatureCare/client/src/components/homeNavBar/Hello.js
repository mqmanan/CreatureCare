import { Player } from "@lottiefiles/react-lottie-player";
import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { me } from "../../modules/authManager";

export default function Hello() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        me().then(setUserProfile);
    }, []);

    return (
        <Container>
            <Grid container spacing={4}>

                <Grid
                    item xs={12} sm={8} md={5}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItem: "center"
                    }}
                >
                    <Player
                        src='https://assets3.lottiefiles.com/packages/lf20_lb6Gsk.json'
                        className="player"
                        loop
                        autoplay
                        style={{
                            height: '480px',
                            width: '480px',
                        }}
                    />
                </Grid>

                <Grid
                    item xs={12} sm={6} md={7}
                    zeroMinWidth
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center",
                    }}
                >
                    <Card
                        sx={{
                            maxWidth: 700, boxShadow: 2
                        }}
                    >
                        <CardContent alignitems="center">
                            <Typography variant="h4" align="center" p={2}>
                                <b>Welcome, <i>{userProfile.fullName}</i>!</b><br></br>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                px={2}
                                align="justify"
                            >
                                <i>CreatureCare</i> is a management system that is designed to help organizations manage & organize files, appointments, & clients!<br></br><br></br>

                                <h4>Functionalities in my app include:</h4>
                                • EDIT, DELETE, VIEW patient files -- admins<br></br>
                                • ADD new patients with the ability to see all users -- admins<br></br>
                                • ADD new patients -- all users<br></br>
                                • VIEW profile details -- all users<br></br>
                                • VIEW all appointments -- admins<br></br><br></br>

                                <h4>Stretch goals include:</h4>
                                • Different navbar for admins/users<br></br>
                                • EDIT, DELETE appointments for all users<br></br>
                                • VIEW appointment details that can include notes -- all users<br></br>
                                • VIEW pet details & appointments on their profile page -- all users<br></br>
                                • Search bar for patient records & appointments -- admins<br></br>


                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>
    );
}