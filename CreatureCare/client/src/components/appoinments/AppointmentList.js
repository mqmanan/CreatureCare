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
                spacing={5}
                columns={{ xs: 4, sm: 8, md: 12 }}
                alignItems="center"
                justifyContent="space-evenly"
                px={30}
                py={5}
            >
                {appointments.map((appoinment) => (
                    <Grid item key={appoinment.id} xs={12} md={4} lg={1}>
                        <AppointmentCard appointment={appoinment} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AppointmentList;