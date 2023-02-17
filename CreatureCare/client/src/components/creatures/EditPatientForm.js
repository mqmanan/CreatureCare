import {
    Grid, TextField, Stack, Typography, Box
} from "@mui/material";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Form } from "./useForm";
import { creatureRemove, getCreature, updateCreature } from "../../modules/creatureManager";
import { getAllUserProfiles } from "../../modules/userProfileManager";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import PetsIcon from '@mui/icons-material/Pets';
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

export default function EditPatientForm() {
    const navigate = useNavigate();
    const { id } = useParams()

    // initial state of object or array will be empty
    const [users, setUsers] = useState([]);

    // info coming from useForm component
    const {
        userChoices,
        setUserChoices,
        handleInputChange
    } = useForm(initialUserChoiceValues)

    // will render the creatures array for drop down menu
    useEffect(() => {
        getCreature(id).then(setUserChoices);
    }, [])

    // will render the userProfiles array for drop down menu
    useEffect(() => {
        getAllUserProfiles().then((user) => setUsers(user));
    }, []);

    // how new info will be sent to api
    const handleSaveButtonClick = (e) => {
        e.preventDefault(); //prevents page from reloading

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
            updateCreature(newPatient)
                .then(() => { navigate("/patients") });
        }
    };

    const handleDeleteButton = (e) => {
        e.preventDefault();

        return creatureRemove(userChoices)
            .then(() => {
                alert("This patient's file will be deleted!")
                navigate("/patients")
            })
    }

    return (
        <>
            <Form>
                <Box
                    sx={{
                        padding: '0px'
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

                                <Typography variant="h3" align="center">
                                    • E D I T •
                                </Typography>

                            </Grid>

                            <Grid
                                item
                                spacing={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItem: "left"
                                }} >

                                <Player
                                    src='https://assets3.lottiefiles.com/packages/lf20_1c4di8xm.json'
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
                                    value={userChoices.name}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    id="type"
                                    label="Type"
                                    variant="outlined"
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
                                    value={userChoices.origin}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    id="gender"
                                    label="Gender"
                                    variant="outlined"
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
                                    value={userChoices.birthdate}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth
                                    id="imageLocation"
                                    label="ImageURL"
                                    variant="outlined"
                                    value={userChoices.imageLocation}
                                    onChange={handleInputChange}
                                    margin="dense"
                                />

                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
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
                                        startIcon={<SaveIcon />}
                                        onClick={handleSaveButtonClick}>
                                        Save
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteForeverIcon />}
                                        onClick={handleDeleteButton}>
                                        Delete
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