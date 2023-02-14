import {
    Grid, TextField, FormControl, MenuItem, Stack, Typography
} from "@mui/material";
import Button from '@mui/material/Button';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Form } from "./useForm";
import { getAllUserProfiles } from "../../modules/userProfileManager";
import { addCreature } from "../../modules/creatureManager";

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
            addCreature(newPatient)
                .then(() => { navigate("/patients") });
        }
    };

    return (

        <Form>
            <Typography variant="h3" align="center" pb={2}>
                New Patient Form
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

                    <FormControl variant="outlined">
                        <TextField
                            id="UserProfileId"
                            select
                            sx={{ mb: 2 }}
                            style={{ width: 300 }}
                            label="Owner"
                            defaultValue="Owner"
                            value={userChoices.userProfileId}
                            onChange={(event) => {
                                const copy = { ...userChoices }
                                copy.userProfileId = parseInt(event.target.value)
                                setUserChoices(copy)
                            }}
                        >
                            <MenuItem value="0"><em>Owner</em></MenuItem>

                            {users.map((user) => (
                                <MenuItem
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.fullName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

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

                    <Stack direction="row" spacing={2} pb={2}>
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
        </Form>
    )
}