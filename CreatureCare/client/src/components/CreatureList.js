import React, { useEffect, useState } from "react";
import { getAllCreatures } from "../modules/creatureManager";
import Creature from './Creature';

const CreatureList = () => {
    const [creatures, setCreatures] = useState([]);

    const getCreatures = () => {
        getAllCreatures().then(tags => setCreatures(tags));
    };

    useEffect(() => {
        getCreatures();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {creatures.map((creature) => (
                    <Creature creature={creature} key={creature.id} />
                ))}
            </div>
        </div>
    );
}

export default CreatureList;