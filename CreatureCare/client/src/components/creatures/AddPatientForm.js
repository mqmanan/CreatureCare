import {
    Grid, TextField, MenuItem, Stack, Typography, Box
} from "@mui/material";
import Button from '@mui/material/Button';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Form } from "./useForm";
import { getAllUserProfiles } from "../../modules/userProfileManager";
import { addCreature } from "../../modules/creatureManager";
import { Player } from "@lottiefiles/react-lottie-player";
import PetsIcon from '@mui/icons-material/Pets';

const initialUserChoiceValues = {
    id: 0,
    name: "",
    type: "",
    origin: "",
    gender: "",
    birthdate: "",
    imageLocation: "",
    userProfileId: "",
    description: ""
}

export default function AddPatientForm() {
    const navigate = useNavigate();

    // initial state of object or array will be empty
    const [users, setUsers] = useState([]);

    // info coming from useForm component
    const {
        userChoices,
        setUserChoices,
        handleInputChange
    } = useForm(initialUserChoiceValues)

    // will render the userProfiles array for drop down menu
    useEffect(() => {
        getAllUserProfiles().then((user) => setUsers(user));
    }, []);

    // handling select drop down menu
    const handleSelect = (event) => {
        const copy = { ...userChoices }
        copy.userProfileId = parseInt(event.target.value)
        setUserChoices(copy)
    }

    // how new info will be sent to api
    const handleSaveButtonClick = (event) => {
        event.preventDefault(); //prevents page from reloading

        const newPatient = { ...userChoices }

        if (
            userChoices.name &&
            userChoices.type &&
            userChoices.origin &&
            userChoices.gender &&
            userChoices.birthdate &&
            userChoices.description &&
            userChoices.userProfileId
        ) {
            addCreature(newPatient)
                .then(() => { navigate("/patients") })
                .catch(() => alert("Please fill out the entire form!"));
        }
    };

    return (
        <>
            <Form>
                <Box
                    sx={{
                        padding: '10px'
                    }}>
                    <Grid
                        container
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

                                <Typography variant="h3" align="center" pb={1}>
                                    New Patient File
                                </Typography>

                            </Grid>

                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItem: "left"
                                }} >

                                <Player
                                    src='https://assets8.lottiefiles.com/packages/lf20_olluraqu.json'
                                    className="player"
                                    loop
                                    autoplay
                                    style={{
                                        height: '300px',
                                        width: '450px',
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="column" item xs={12} md={6}>
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-center",
                                    alignItem: "left"
                                }} >

                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    placeholder="Name of creature?"
                                    value={userChoices.name}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    id="type"
                                    label="Type"
                                    variant="outlined"
                                    placeholder="Type of creature?"
                                    value={userChoices.type}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                            </Grid>

                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-center",
                                    alignItem: "left"
                                }} >
                                <TextField
                                    fullWidth
                                    id="origin"
                                    label="Origin"
                                    variant="outlined"
                                    placeholder="Which universe is the creature from?"
                                    value={userChoices.origin}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    id="gender"
                                    label="Gender"
                                    variant="outlined"
                                    placeholder="Male? Female? Other? If unsure, type N/A"
                                    value={userChoices.gender}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="birthdate"
                                    label="Birthdate"
                                    variant="outlined"
                                    placeholder="Use this format please: YYYY-MM-DD"
                                    value={userChoices.birthdate}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    id="imageLocation"
                                    label="ImageURL"
                                    variant="outlined"
                                    placeholder="http://www.google.com"
                                    value={userChoices.imageLocation}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />

                                <TextField
                                    margin="dense"
                                    select
                                    variant="outlined"
                                    id="userProfileId"
                                    label="Owner"
                                    defaultValue=""
                                    style={{ width: 720 }}
                                    value={userChoices.userProfileId}
                                    onChange={handleSelect}
                                >
                                    <MenuItem value="0"><em>Human compadre</em></MenuItem>

                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.fullName}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    placeholder="Short creature bio"
                                    value={userChoices.description}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />

                                <Stack direction="row" spacing={1} pt={1}>
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
                                        startIcon={<SaveRoundedIcon />}
                                        onClick={handleSaveButtonClick}>
                                        Save
                                    </Button>
                                </Stack>


                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Form >
        </>
    )
}