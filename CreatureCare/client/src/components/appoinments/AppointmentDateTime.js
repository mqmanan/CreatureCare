import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, FormControl, Grid, MenuItem, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addAppointment } from '../../modules/appointmentManager';
import { getUserWithCreatures } from '../../modules/userProfileManager';
import { Player } from '@lottiefiles/react-lottie-player';

export default function AppointmentDateTime() {
    const navigate = useNavigate();
    // const { id } = useParams();

    // inital state render
    const [userCreatures, setUserCreatures] = useState([])

    const [userChoices, setUserChoices] = useState({
        id: 0,
        userProfileId: 0,
        creatureId: 0,
        dateRequested: new Date(),
        amountDue: 0,
        dateDue: "",
        paidAmount: 0,
        invoiceSentOnDate: ""
    })

    // will render the user's creatures array for drop down menu
    useEffect(() => {
        getUserWithCreatures().then((userCreature) => setUserCreatures(userCreature));
    }, []);

    // handling select drop down menu
    const handleSelect = (event) => {
        const copy = { ...userChoices }
        copy.creatureId = parseInt(event.target.value)
        setUserChoices(copy)
    }

    const handleDateTimeChange = (newValue) => {
        setUserChoices(newValue);
    };

    // work in progress
    const handleSaveButtonClick = (e) => {
        e.preventDefault(); //prevents page from reloading

        const newAppointment = { ...userChoices }

        if (
            userChoices.creatureId &&
            userChoices.dateRequested
        ) {
            addAppointment(newAppointment)
                .then(() => {
                    alert("This appointment will be under your creature's profile!")
                    navigate("/")
                });
        }
    };

    return (
        <>
            <Typography variant="h3" align="center" pb={2}>
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
                                justifyContent: "flex-start",
                                alignItem: "center"
                            }} >
                            <Player
                                src='https://assets5.lottiefiles.com/packages/lf20_ilp95ggh.json'
                                className="player"
                                loop
                                autoplay
                                style={{ height: '375px', width: '375px' }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container direction="column" item xs={12} md={4}>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                justifyContent: "flex-center",
                                alignItem: "left"
                            }} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <MobileDatePicker
                                        label="Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={userChoices.dateRequested}
                                        onChange={handleDateTimeChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <TimePicker
                                        label="Time"
                                        value={userChoices.dateRequested}
                                        onChange={handleDateTimeChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />

                                    <FormControl variant="outlined">
                                        <TextField
                                            fullWidth
                                            select
                                            id="userProfileId"
                                            label="Creature"
                                            defaultValue=""
                                            sx={{ mb: 2 }}
                                            style={{ width: 350 }}
                                            value={userChoices.creatureId}
                                            onChange={handleSelect}
                                        >
                                            <MenuItem value="0"><em>Which pet?</em></MenuItem>

                                            {userCreatures?.creatures?.map((creature) => (
                                                <MenuItem key={creature?.id} value={creature?.id}>
                                                    {creature?.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Stack>
                            </LocalizationProvider>

                        </Grid>

                        <Stack direction="row" spacing={1} mt={1}>

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