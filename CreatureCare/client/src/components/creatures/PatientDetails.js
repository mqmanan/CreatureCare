import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCreatureById, getCreatureDoctors } from '../../modules/creatureManager';
import { Grid, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';

export default function PatientDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [creature, setCreature] = useState([]);
    const [creatureDoctors, setCreatureDoctors] = useState({});

    useEffect(() => {
        getCreatureById(id).then((creature) => setCreature(creature));
    }, []);

    // fetching data related to creature's doctors through appointments table
    useEffect(() => {
        getCreatureDoctors(id).then((creatureDoctors) => setCreatureDoctors(creatureDoctors));
    }, []);

    // <Grid
    //                         container
    //                         alignItems="center"
    //                         justifyContent="space-evenly"
    //                         p={1}
    //                     >
    //                         {creatureDoctors?.userProfiles?.map((creature) => (
    //                             <Grid item key={creature.id} xs={12} md={3} lg={4}>
    //                                 <b>Doctor</b>: {creature.fullName}
    //                             </Grid>
    //                         ))}
    //                     </Grid>

    return (
        <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Stack direction="row" spacing={5}>
                <Card
                    sx={{
                        maxWidth: 500,
                        boxShadow: 3
                    }}>
                    <CardMedia
                        sx={{
                            height: 300,
                        }}
                        image={creature.imageLocation}
                        title={creature.name}
                        component='div'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            <center>{creature.name}</center>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" px={3} py={1}>
                            <b>Type</b>: {creature.type}<br></br>
                            <b>Origin</b>: {creature.origin}<br></br>
                            <b>Gender</b>: {creature.gender}<br></br>
                            <b>DOB</b>: {creature.birthdate}<br></br><br></br>

                            <b>Owner</b>: {creature?.user?.fullName}<br></br>
                            <b>Phone</b>: {creature?.user?.telephone}<br></br>
                            <b>Email</b>: {creature?.user?.email}<br></br>
                        </Typography>
                    </CardContent>
                    <CardActions
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >

                        <Stack direction="row" spacing={1} pb={1} px={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                startIcon={<PetsIcon />}
                                onClick={() => { navigate("/patients") }}>
                                Records
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                endIcon={<EditIcon />}
                                onClick={() => {
                                    navigate(`/patients/${id}/edit`)
                                }}>
                                Edit
                            </Button>
                        </Stack>

                    </CardActions>
                </Card>

                <Card
                    sx={{
                        maxWidth: 500,
                        height: 300,
                        boxShadow: 3,
                        p: 3
                    }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <center>Associated Doctors</center>
                        </Typography>

                        {creatureDoctors?.userProfiles?.map((doctor) => (
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                p={1}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<PersonIcon />}
                                    onClick={() => { navigate("/staff") }}>
                                    {doctor.fullName}
                                </Button>
                            </Grid>

                        ))}

                    </CardContent>
                </Card>
            </Stack>
        </Grid >
    );

};