import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { addCreature } from "../modules/creatureManager";
import { getAllUserProfiles } from "../modules/userProfileManager";

export default function AddCreature() {
    const navigate = useNavigate();
    const { Id } = useParams;
    const [users, setUsers] = useState([]);
    const [creatureForm, setCreatureForm] = useState({
        id: 0,
        name: "",
        type: "",
        origin: "",
        gender: "",
        birthdate: "",
        imageLocation: "",
        userProfileId: "",
        description: ""
    })

    const handleInputChange = (event) => {
        const copy = { ...creatureForm }
        copy[event.target.id] = event.target.value
        setCreatureForm(copy)
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const newCreature = { ...creatureForm }

        if (
            creatureForm.name &&
            creatureForm.type &&
            creatureForm.origin &&
            creatureForm.gender &&
            creatureForm.birthdate &&
            creatureForm.description &&
            creatureForm.userProfileId
        ) {
            addCreature(newCreature)
                .then(() => { navigate("/patients") });
        }
    };

    useEffect(() => {
        getAllUserProfiles().then((user) => setUsers(user));
    }, []);

    return (
        <>

            <center><h1>NEW PATIENT FORM</h1></center><br></br>

            <FormGroup>
                <Label for="creature">Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Patient's name"
                    value={creatureForm.name}
                    onChange={handleInputChange}
                />

                <Label for="creature">Type</Label>
                <Input
                    id="type"
                    type="text"
                    placeholder="What kind of creature is this?"
                    value={creatureForm.type}
                    onChange={handleInputChange}
                />

                <Label for="creature">Origin</Label>
                <Input
                    id="origin"
                    type="text"
                    placeholder="Where is the creature from?"
                    value={creatureForm.origin}
                    onChange={handleInputChange}
                />

                <Label for="creature">Gender</Label>
                <Input
                    id="gender"
                    type="text"
                    placeholder="Biologically a male or female?"
                    value={creatureForm.gender}
                    onChange={handleInputChange}
                />

                <Label for="creature">DOB</Label>
                <Input
                    id="birthdate"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={creatureForm.birthdate}
                    onChange={handleInputChange}
                />

                <Label for="creature">Image</Label>
                <Input
                    id="imageLocation"
                    type="text"
                    placeholder="Add image url"
                    value={creatureForm.imageLocation}
                    onChange={handleInputChange}
                />

                <Label for="creature">Owner</Label>
                <Input
                    id="owner"
                    type="select"
                    value={creatureForm.userProfileId}
                    onChange={(event) => {
                        const copy = { ...creatureForm }
                        copy.userProfileId = parseInt(event.target.value)
                        setCreatureForm(copy)
                    }}
                >

                    <option>✦ Owner? ✦</option>
                    {
                        users.map((user) => {
                            return <option key={user.id} value={user.id}>
                                {user.fullName}</option>
                        }
                        )
                    }
                </Input>

                <Label for="creature">Description</Label>
                <Input
                    id="description"
                    type="text"
                    style={{
                        height: "5rem"
                    }}
                    placeholder="Short bio about the creature"
                    value={creatureForm.description}
                    onChange={handleInputChange}
                />

                <Button type="submit"
                    onClick={
                        handleSaveButtonClick
                    }
                >
                    Save
                </Button>
            </FormGroup>

        </>
    );
}
