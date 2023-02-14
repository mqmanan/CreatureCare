import React, { useEffect, useState } from "react";
import { getAllCreatures } from "../../modules/creatureManager";
import Grid from '@mui/material/Grid';
import PatientCard from "./PatientCard";
import { Container, Typography } from "@mui/material";

export default function PatientList() {
    const [creatures, setCreatures] = useState([]);

    // will render the creatures array that will be mapped over
    useEffect(() => {
        getAllCreatures().then((creature) => setCreatures(creature));
    }, []);

    return (
        <Container maxWidth="xl">

            <Typography variant="h3" align="center" pb={1}>
                Patient Records
            </Typography>

            <Grid
                container
                alignItems="center"
                justifyContent="space-evenly"
                spacing="30"
                p={7}
            >
                {creatures.map((creature) => (
                    <Grid item key={creature.id} xs={12} md={3} lg={4}>
                        <PatientCard creature={creature} />
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
}