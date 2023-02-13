import {
    Grid, TextField, Select, FormControl, RadioGroup, FormControlLabel,
    Radio, FormLabel, Stack, OutlinedInput, MenuItem, Menu
} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import PetsIcon from '@mui/icons-material/Pets';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Form } from "./useForm";
import { addCreature, getCreature } from "../../modules/creatureManager";
import { getAllUserProfiles } from "../../modules/userProfileManager";

const initialUserChoiceValues = {
    id: 0,
    name: "",
    type: "",
    origin: "",
    gender: 'male',
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
            addCreature(newPatient)
                .then(() => { navigate("/patients") });
        }
    };

    return (

        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        defaultValue="Name of creature?"
                        value={userChoices.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="type"
                        label="Type"
                        variant="outlined"
                        defaultValue="Type of creature?"
                        value={userChoices.type}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="origin"
                        label="Origin"
                        variant="outlined"
                        defaultValue="Which universe is the creature from?"
                        value={userChoices.origin}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup row
                            id="gender"
                            value={userChoices.gender}
                            onChange={handleInputChange}>

                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />

                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="birthdate"
                        label="Birthdate"
                        variant="outlined"
                        defaultValue="YYYY-MM-DD"
                        value={userChoices.birthdate}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="imageLocation"
                        label="Name"
                        variant="outlined"
                        defaultValue="http://www.google.com"
                        value={userChoices.imageLocation}
                        onChange={handleInputChange}
                    />

                    <Select
                        multiple
                        displayEmpty
                        id="userProfileId"
                        label="Owner"
                        value={userChoices.userProfileId}
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.userProfileId = parseInt(event.target.value)
                            setUserChoices(copy)
                        }}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Owner?</em>;
                            }

                            return selected.join(', ');
                        }}
                        Menu={Menu}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Owner</em>
                        </MenuItem>
                        {users.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name.fullName}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={7}
                        defaultValue="Short creature bio!"
                        value={userChoices.description}
                        onChange={handleInputChange}
                    />

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            startIcon={<PetsIcon />}
                            onClick={() => { navigate("/patients") }}>
                            Patients
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            endIcon={<SendIcon />}
                            onClick={handleSaveButtonClick}>
                            Send
                        </Button>
                    </Stack>

                </Grid>
            </Grid>
        </Form>
    )
}