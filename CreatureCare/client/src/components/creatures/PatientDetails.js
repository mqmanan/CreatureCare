import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { creatureRemove, getCreatureById } from '../../modules/creatureManager';
import { Container, Grid, Stack } from '@mui/material';

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
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                    sx={{
                        height: 300,
                        '--Grid-borderWidth': '2px',
                        borderTop: 'var(--Grid-borderWidth) solid',
                        borderLeft: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                    }}
                    image={creature.imageLocation}
                    title={creature.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        <center>{creature.name}</center>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <center>Associated with -- {creature?.userProfile?.fullName}</center>
                    </Typography>
                </CardContent>
                <CardActions>

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="medium"
                            onClick={() => { navigate("/patients") }}>
                            Catalog</Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            onClick={handleDeleteButton}>
                            Delete
                        </Button>
                    </Stack>

                </CardActions>
            </Card>
        </Grid>
    );
};