import React, { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { getAllAppointments } from "../../modules/appointmentManager";
import { Container, Grid, Typography } from "@mui/material";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    // will render appointments array that will be mapped over
    useEffect(() => {
        getAllAppointments().then((appointment) => setAppointments(appointment));
    }, []);

    return (
        <Container maxWidth="xl">

            <Typography variant="h3" align="center" pb={1}>
                Appointment Tracker
            </Typography>

            <Grid
                container
                alignItems="center"
                justifyContent="space-evenly"
                spacing="30"
                p={7}
            >
                {appointments.map((appoinment) => (
                    <Grid item key={appoinment.id} xs={12} md={6} lg={3}>
                        <AppointmentCard appointment={appoinment} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AppointmentList;