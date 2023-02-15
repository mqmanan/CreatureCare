import {
    Card, CardActions, CardContent, CardMedia,
    Container, Grid, Typography, Button
} from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { me } from "../../modules/authManager";


const UserProfileDetails = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        me().then(setUserProfile);
    }, []);

    if (!userProfile.imageLocation) {
        userProfile.imageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1";
    }

    return (
        <Container maxWidth="xl">
            <Grid
                container
                spacing={5}
                columns={{ xs: 4, sm: 8, md: 12 }}
                alignItems="center"
                justifyContent="space-evenly"
                px={30}
                py={5}
            >
                <Card
                    sx={{
                        maxWidth: 600, boxShadow: 3
                    }}
                >
                    <CardMedia
                        sx={{ height: 260 }}
                        image={userProfile.imageLocation}
                        title={userProfile.fullName}
                        component='div'
                    />
                    <CardContent alignitems="center">
                        <Typography variant="h5" component="div" p={2}>
                            <b>{userProfile.fullName}</b>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" px={2}>
                            <b>Phone</b>: {userProfile.telephone}<br></br>
                            <b>E-mail</b>: {userProfile.email}<br></br>
                            <b>Address</b>: {userProfile.address}
                        </Typography>
                    </CardContent>
                    <CardActions px={2}>
                        <Button
                            size="small"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                            onClick={() => { navigate(`/`) }}>
                            Edit</Button>
                    </CardActions>
                </Card>

            </Grid>
        </Container>
    );
}

export default UserProfileDetails;