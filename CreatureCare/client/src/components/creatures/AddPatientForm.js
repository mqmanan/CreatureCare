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

                                <Typography variant="h3" align="center">
                                    New Patient File
                                </Typography>

                            </Grid>

                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItem: "center"
                                }} >

                                <Player
                                    src='https://assets5.lottiefiles.com/private_files/lf30_bivykh3v.json'
                                    className="player"
                                    loop
                                    autoplay
                                    style={{
                                        height: '350px',
                                        width: '350px',
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container direction="column" item xs={12} md={3}>
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-center",
                                    alignItem: "left"
                                }} >

                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    placeholder="Name of creature?"
                                    value={userChoices.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <TextField
                                margin="dense"
                                id="type"
                                label="Type"
                                variant="outlined"
                                placeholder="Type of creature? If unsure, type N/A"
                                value={userChoices.type}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="dense"
                                id="origin"
                                label="Origin"
                                variant="outlined"
                                placeholder="Which universe is the creature from? If unsure, type N/A"
                                value={userChoices.origin}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                id="gender"
                                label="Gender"
                                variant="outlined"
                                placeholder="Male or Female? Other? If unsure, type N/A"
                                value={userChoices.gender}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="dense"
                                id="birthdate"
                                label="Birthdate"
                                variant="outlined"
                                placeholder="Use this format please: YYYY-MM-DD"
                                value={userChoices.birthdate}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="dense"
                                id="imageLocation"
                                label="ImageURL"
                                variant="outlined"
                                placeholder="http://www.google.com"
                                value={userChoices.imageLocation}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="dense"
                                select
                                variant="outlined"
                                id="userProfileId"
                                label="Owner"
                                defaultValue=""
                                style={{ width: 500 }}
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
                                margin="dense"
                                id="description"
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={2}
                                placeholder="Short creature bio"
                                value={userChoices.description}
                                onChange={handleInputChange}
                            />

                            <Stack direction="row" spacing={1} pb={2} pt={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    endIcon={<SaveRoundedIcon />}
                                    onClick={handleSaveButtonClick}>
                                    Save
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    startIcon={<ClearRoundedIcon />}
                                    onClick={() => { navigate("/patients") }}>
                                    Cancel
                                </Button>
                            </Stack>


                        </Grid>

                    </Grid>

                </Box >

            </Form >
        </>
    )
}

