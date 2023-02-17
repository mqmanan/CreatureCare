import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, FormControl, Grid, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addAppointment } from '../../modules/appointmentManager';
import { getAllDoctors, getUserWithCreatures } from '../../modules/userProfileManager';
import { Player } from '@lottiefiles/react-lottie-player';
import { DateTimePicker } from "@mui/x-date-pickers";

export default function AppointmentDateTime() {
    const navigate = useNavigate();

    // inital state render
    const [userCreatures, setUserCreatures] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [userChoices, setUserChoices] = useState({
        id: 0,
        userProfileDocId: 0,
        creatureId: 0,
        dateRequested: Date.now(),
        amountDue: 0,
        dateDue: "",
        paidAmount: 0,
        invoiceSentOnDate: ""
    })

    // will render the user's creatures array for drop down menu
    useEffect(() => {
        getUserWithCreatures().then((userCreature) => setUserCreatures(userCreature));
    }, []);

    useEffect(() => {
        getAllDoctors().then((doctor) => setDoctors(doctor));
    }, []);

    // handling select drop down menu
    const handleCreatureSelect = (event) => {
        const copy = { ...userChoices }
        copy.creatureId = parseInt(event.target.value)
        setUserChoices(copy)
    }

    const handleDoctorSelect = (event) => {
        const copy = { ...userChoices }
        copy.userProfileDocId = parseInt(event.target.value)
        setUserChoices(copy)
    }

    const handleDateTimeChange = (newValue) => {
        const copy = { ...userChoices }
        copy.dateRequested = newValue["$d"] //the specific property that is capturing the dateTime info
        setUserChoices(copy);
    };

    const handleSaveButtonClick = (e) => {
        e.preventDefault(); //prevents page from reloading

        const newAppointment = { ...userChoices }

        if (
            userChoices.creatureId &&
            userChoices.dateRequested
        ) {
            addAppointment(newAppointment)
                .then(() => {
                    alert("The appointment will be under your creature's profile!")
                    navigate("/")
                });
        }
    };

    return (
        <>
            <Typography variant="h3" align="center" pb={4}>
                Schedule Appointment
            </Typography>

            <Box
                sx={{
                    maxWidth: "600"
                }}>
                <Grid
                    container
                    p={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid container direction="column" item xs={12} md={4}>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItem: "center"
                            }} >
                            <Player
                                src='https://assets5.lottiefiles.com/packages/lf20_ilp95ggh.json'
                                className="player"
                                loop
                                autoplay
                                style={{ height: '355px', width: '350px' }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container direction="column" item xs={12} md={4}>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                direction: "column",
                                justifyContent: "flex-center",
                                alignItem: "left"
                            }} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date & Time"
                                    id="dateRequested"
                                    value={userChoices.dateRequested}
                                    onChange={handleDateTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid
                            item
                            sx={{
                                display: "flex",
                                direction: "column",
                                justifyContent: "flex-center",
                                alignItem: "left"
                            }} >
                            <FormControl variant="outlined">
                                <TextField
                                    select
                                    margin="normal"
                                    id="creatureId"
                                    label="Pets"
                                    defaultValue=""
                                    sx={{ mb: 1 }}
                                    style={{ width: 260 }}
                                    value={userChoices.creatureId}
                                    onChange={handleCreatureSelect}
                                >
                                    <MenuItem value="0"><em>Which pet?</em></MenuItem>

                                    {userCreatures?.creatures?.map((creature) => (
                                        <MenuItem key={creature?.id} value={creature?.id}>
                                            {creature?.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            sx={{
                                display: "flex",
                                direction: "column",
                                justifyContent: "flex-center",
                                alignItem: "left"
                            }} >
                            <FormControl variant="outlined">
                                <TextField
                                    select
                                    margin="normal"
                                    id="userProfileDocId"
                                    label="Doctors"
                                    defaultValue=""
                                    sx={{ mb: 2 }}
                                    style={{ width: 260 }}
                                    value={userChoices.userProfileDocId}
                                    onChange={handleDoctorSelect}
                                >
                                    <MenuItem value="0"><em>Which doctor?</em></MenuItem>

                                    {doctors.map((doctor) => (
                                        <MenuItem key={doctor?.id} value={doctor?.id}>
                                            {doctor?.fullName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>

                        <Stack direction="row" spacing={1}>

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                endIcon={<SendIcon />}
                                onClick={handleSaveButtonClick}>
                                Send
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                endIcon={<ClearIcon />}
                                onClick={() => { navigate("/") }}>
                                Cancel
                            </Button>

                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}