import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAllCreatures } from "../../modules/creatureManager";
import CreatureCard from "./CreatureCard";

const CreatureList = () => {
    const navigate = useNavigate();
    const [creatures, setCreatures] = useState([]);

    // will render the creatures array that will be mapped over
    useEffect(() => {
        getAllCreatures().then((creature) => setCreatures(creature));
    }, []);

    return (
        <>

            <Button onClick={() => { navigate("/patients/add") }}>Add</Button>

            <div className="container">
                <div className="row justify-content-center">
                    {creatures.map((creature) => (
                        <CreatureCard creature={creature} key={creature.id} />
                    ))}
                </div>
            </div>

        </>
    );
}

export default CreatureList;