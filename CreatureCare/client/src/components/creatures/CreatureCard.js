import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

const CreatureCard = ({ creature }) => {

    return (
        <>

            <Card >
                <div className="creature-card">
                    <Link to={`/patients/${creature.id}`} >
                        <img className="creature-img"
                            src={creature.imageLocation}
                            alt="creature"
                            width="210px"
                        />
                    </Link>
                </div>

                <div className="creature-name">
                    <Link to={`/patients/${creature.id}`} >
                        Name -- {creature.name}
                    </Link>
                </div>

                {/* <div className="creature-owner">
                    <Link to={`/patients/${creature.id}`} >
                        Owner -- {creature?.userProfile?.fullName}
                    </Link>
                </div> */}
            </Card>

        </>
    );
};

export default CreatureCard;



