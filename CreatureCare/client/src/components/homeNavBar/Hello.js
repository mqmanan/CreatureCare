import React, { useState, useEffect } from "react";
import { me } from "../../modules/authManager";

export default function Hello() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        me().then(setUserProfile);
    }, []);

    return (
        <span style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: "50%",
            marginTop: "-0.5rem",
            textAlign: "center",
        }}>Welcome {userProfile.fullName}!</span>
    );
}