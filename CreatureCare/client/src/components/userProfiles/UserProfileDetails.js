import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { me } from "../../modules/authManager";


const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        me().then(setUserProfile);
    }, []);

    if (!userProfile.imageLocation) {
        userProfile.imageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1";
    }

    return (
        <>

            <div className="container">

                <Typography variant="h4">
                    Profile Details
                </Typography><br></br><br></br>

                <img className="image" src={userProfile.imageLocation} alt="user" />
                <div><b>Name</b>: {userProfile.fullName}</div>
                <div><b>Email</b>: {userProfile.email}</div>
                <div><b>Address</b>: {userProfile.address}</div>
                <div><b>Joined</b>: {userProfile.dateCreated}</div>
            </div>

        </>
    );
}

export default UserProfileDetails;