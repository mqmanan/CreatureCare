import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { getCreature, updateCreature } from "../modules/creatureManager";
import { getAllUserProfiles } from "../modules/userProfileManager";

export default function EditCreature() {
    const navigate = useNavigate()
    const { id } = useParams()

    // initial state of object or array will be empty
    const [users, setUsers] = useState([]);
    const [userChoices, setUserChoices] = useState({
        id: 0,
        name: "",
        type: "",
        origin: "",
        gender: "",
        birthdate: "",
        imageLocation: "",
        userProfileId: 0,
        description: "",
        isActive: true
    })

    // will render the creature by the id passed thru useParams
    useEffect(() => {
        getCreature(id).then(setUserChoices);
    }, [])

    // will render userProfiles for drop down menu
    useEffect(() => {
        getAllUserProfiles().then((user) => setUsers(user));
    }, []);

    // how the data is handled in the form
    const handleInputChange = (event) => {
        const copy = { ...userChoices }
        copy[event.target.id] = event.target.value
        setUserChoices(copy)
    }

    // what will be sent to the api
    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const productToSendToApi = {
            ...userChoices
        }

        return updateCreature(productToSendToApi)
            .then(() => {
                navigate("/patients")
            })
    }

    return (
        <>

            <center><h1>EDIT PATIENT FORM</h1></center><br></br>

            <FormGroup>
                <Label for="creature">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={userChoices.name}
                    onChange={handleInputChange}
                />

                <Label for="creature">Type</Label>
                <Input
                    id="type"
                    type="text"
                    value={userChoices.type}
                    onChange={handleInputChange}
                />

                <Label for="creature">Origin</Label>
                <Input
                    id="origin"
                    type="text"
                    value={userChoices.origin}
                    onChange={handleInputChange}
                />

                <Label for="creature">Gender</Label>
                <Input
                    id="gender"
                    type="text"
                    value={userChoices.gender}
                    onChange={handleInputChange}
                />

                <Label for="creature">DOB</Label>
                <Input
                    id="birthdate"
                    type="text"
                    value={userChoices.birthdate}
                    onChange={handleInputChange}
                />

                <Label for="creature">Image</Label>
                <Input
                    id="imageLocation"
                    type="text"
                    value={userChoices.imageLocation}
                    onChange={handleInputChange}
                />

                <Label for="creature">Description</Label>
                <Input
                    id="description"
                    type="text"
                    style={{
                        height: "5rem"
                    }}
                    value={userChoices.description}
                    onChange={handleInputChange}
                />

                <Button type="submit" onClick={handleSaveButtonClick}>Update</Button>

                <Button onClick={() => { navigate("/patients") }}>Patient Directory</Button>
            </FormGroup>

        </>
    );
}
