import {
    Card, CardActions, CardContent, CardMedia, Grid,
    Typography, Button, Fab, Stack
} from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { me } from "../../modules/authManager";
import PetsIcon from '@mui/icons-material/Pets';
import { getUserWithCreatures } from "../../modules/userProfileManager";
import ModeIcon from '@mui/icons-material/Mode';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Player } from "@lottiefiles/react-lottie-player";


const UserProfileDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [userProfile, setUserProfile] = useState({});
    const [userCreatures, setUserCreatures] = useState({});

    // this will fetch currentUser's profile
    useEffect(() => {
        me().then(setUserProfile);
    }, []);

    // this will fetch the data from server dealing with the currentUser's creatures
    useEffect(() => {
        getUserWithCreatures().then((userCreature) => setUserCreatures(userCreature));
    }, []);

    // if user doesn't have a profile img, replace it with this img
    // if (!userProfile.imageLocation) {
    //     userProfile.imageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1";
    // }

    return (
        <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Stack direction="row" spacing={7}>
                <Card
                    sx={{
                        maxWidth: 550, boxShadow: 3
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
                    <CardActions
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}

                    >
                        <Stack direction="row" spacing={1} pb={2}>
                            <Fab
                                aria-label='records'
                                color='primary'
                                size='small'
                                onClick={() => { navigate("/") }}
                            >
                                <ArrowBackIcon />
                            </Fab>

                            <Fab
                                aria-label='edit'
                                color='primary'
                                size='small'
                                onClick={() => { navigate(`/`) }}
                            >
                                <ModeIcon />
                            </Fab>
                        </Stack>
                    </CardActions>
                </Card>

                <Card
                    sx={{
                        maxWidth: 500,
                        height: 500,
                        boxShadow: 3,
                        p: 3
                    }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" pb={1}>
                            <center>🐾 Pets 🐾</center>
                        </Typography>

                        <Player
                            src='https://assets1.lottiefiles.com/packages/lf20_OAPpKc.json'
                            className="player"
                            loop
                            autoplay
                            style={{
                                height: '50px',
                                width: '50px',
                            }}
                        />

                        {userCreatures?.creatures?.map((userCreature) => (
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                pt={2}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<PetsIcon />}
                                    onClick={() => { navigate("/") }}>
                                    {userCreature.name}
                                </Button>
                            </Grid>

                        ))}

                    </CardContent>
                </Card>
            </Stack>
        </Grid >
    );
}

export default UserProfileDetails;