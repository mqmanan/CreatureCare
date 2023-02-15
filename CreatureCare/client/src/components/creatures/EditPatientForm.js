import {
    Grid, TextField, Select, FormControl, Stack, MenuItem, Typography, InputLabel
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

    // will render the userProfiles array for drop down menu
    useEffect(() => {
        getCreature(id).then(setUserChoices);
    }, [])

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

        <Form>
            <Typography variant="h3" align="center" pb={2}>
                Edit Patient Details
            </Typography>
            <Grid
                container
                align="center"
                p={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="name"
                        label="Name"
                        variant="outlined"
                        placeholder="Name of creature?"
                        value={userChoices.name}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="type"
                        label="Type"
                        variant="outlined"
                        placeholder="Type of creature? If unsure, type N/A"
                        value={userChoices.type}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="origin"
                        label="Origin"
                        variant="outlined"
                        placeholder="Which universe is the creature from? If unsure, type N/A"
                        value={userChoices.origin}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="gender"
                        label="Gender"
                        variant="outlined"
                        placeholder="Male or Female? Other? If unsure, type N/A"
                        value={userChoices.gender}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
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
                        sx={{ my: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="imageLocation"
                        label="ImageURL"
                        variant="outlined"
                        placeholder="http://www.google.com"
                        value={userChoices.imageLocation}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />

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
                        sx={{ mb: 2 }}
                    />

                    <Stack direction="row" spacing={1} pb={2}>
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
        </Form>
    )
}