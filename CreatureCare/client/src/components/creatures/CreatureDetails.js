import { Card, Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { creatureRemove, getCreatureById } from "../../modules/creatureManager";

const CreatureDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [creature, setCreature] = useState([]);

    useEffect(() => {
        getCreatureById(id).then((creature) => setCreature(creature));
    }, []);

    const handleDeleteButton = (e) => {
        e.preventDefault();

        return creatureRemove(creature)
            .then(() => {
                alert("This patient's file will be deleted!")
                navigate("/patients")
            })
    }

    return (
        <>

            <Card >
                <div className="creature-card">
                    <img className="creature-img"
                        src={creature.imageLocation}
                        alt="creature"
                        width="250x"
                    />
                </div>

                <div className="creature-name">
                    {creature.name}
                </div><br></br><br></br>

                <div className="creature-owner">
                    Type -- {creature.type} <br></br>
                    Origin -- {creature.origin} <br></br>
                    Gender -- {creature.gender} <br></br>
                    DOB -- {creature.birthdate} <br></br><br></br>

                    Description -- {creature.description}<br></br><br></br>

                    Owner -- {creature?.userProfile?.fullName} <br></br>
                    Email-- {creature?.userProfile?.email} <br></br>
                    Phone -- {creature?.userProfile?.telephone} <br></br>

                </div>
            </Card>

            <Button onClick={() => { navigate("/patients") }}>Patient Directory</Button>

            <Button onClick={() => { navigate(`/patients/${id}/edit`) }}>Edit</Button>

            <Button type="submit" onClick={handleDeleteButton}>Delete</Button>

        </>
    );
};

export default CreatureDetails;



