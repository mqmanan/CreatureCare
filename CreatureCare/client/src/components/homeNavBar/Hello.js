import { Player } from "@lottiefiles/react-lottie-player";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { me } from "../../modules/authManager";

export default function Hello() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        me().then(setUserProfile);
    }, []);

    return (
        <>
            <Typography
                variant="h3"
                align="center"
                mb={1}
            >
                Welcome, {userProfile.fullName}!<br></br>
            </Typography>

            <Player
                src='https://assets3.lottiefiles.com/packages/lf20_lb6Gsk.json'
                className="player"
                loop
                autoplay
                style={{
                    height: '350px',
                    width: '350px',
                }}
            />

        </>
    );
}