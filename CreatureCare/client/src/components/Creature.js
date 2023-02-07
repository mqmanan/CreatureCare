import React from "react";
import { Card } from "reactstrap";

const Creature = ({ creature }) => {
    return (
        <>

            <Card >
                <div>
                    <strong>{creature.imageLocation}</strong><br></br>
                </div>
                <div>
                    <strong>Name:</strong> {creature.name}<br></br>
                    <strong>Type:</strong> {creature.type}<br></br>
                    <strong>Origin:</strong> {creature.origin}<br></br>
                    <strong>Gender:</strong> {creature.gender}<br></br>
                    <strong>Birthdate:</strong> {creature.birthdate}<br></br>
                    <strong>Description:</strong> {creature.description}<br></br>
                </div>
                <div>
                    <strong>Owner:</strong> {creature.userProfile.firstName} {creature.userProfile.lastName}<br></br>
                    <strong>Email:</strong> {creature.userProfile.email}
                </div>
            </Card>

        </>
    );
};

export default Creature;



