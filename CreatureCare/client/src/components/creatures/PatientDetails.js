import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { creatureRemove, getCreatureById } from '../../modules/creatureManager';
import { Grid, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

export default function PatientDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [creature, setCreature] = useState([]);

    useEffect(() => {
        getCreatureById(id).then((creature) => setCreature(creature));
    }, []);

    const handleDeleteButton = (e) => {
        e.preventDefault();

        return creatureRemove(creature)
            .then(() => {
                alert("This patient's file will be deleted!")
                navigate("/patients")
            })
    }

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
                        maxWidth: 300,
                        boxShadow: 3
                    }}>
                    <CardMedia
                        sx={{
                            height: 300,
                            '--Grid-borderWidth': '2px',
                            borderTop: 'var(--Grid-borderWidth) solid',
                            borderColor: 'divider',
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

                            <b>Owner</b>: {creature?.userProfile?.fullName}<br></br>
                            <b>Phone</b>: {creature?.userProfile?.telephone}<br></br>
                            <b>Email</b>: {creature?.userProfile?.email}<br></br>
                        </Typography>
                    </CardContent>
                    <CardActions>

                        <Stack direction="row" spacing={1} pb={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                endIcon={<FolderSharedIcon />}
                                onClick={() => { navigate("/patients") }}>
                                Records
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                size="medium"
                                endIcon={<DeleteForeverIcon />}
                                onClick={handleDeleteButton}>
                                Delete
                            </Button>
                        </Stack>

                    </CardActions>
                </Card>

                <Card
                    sx={{
                        maxWidth: 600,
                        height: 600,
                        boxShadow: 3,
                        p: 5
                    }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <center>Associated Doctors</center>
                        </Typography>

                    </CardContent>
                </Card>
            </Stack>
        </Grid >
    );

};