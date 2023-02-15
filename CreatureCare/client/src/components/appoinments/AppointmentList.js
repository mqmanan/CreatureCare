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

            <Typography variant="h3" align="center" pb={5}>
                Appointment Tracker
            </Typography>

            <Grid
                container
                spacing={5}
                alignItems="center"
                justifyContent="space-evenly"
                px={33}
                pb={5}
            >
                {appointments.map((appoinment) => (
                    <Grid item key={appoinment.id} xs={12} md={3} lg={4}>
                        <AppointmentCard appointment={appoinment} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AppointmentList;