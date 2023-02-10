import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";

const AppointmentCard = ({ appointment }) => {

    return (
        <>

            <Card >
                <div className="appointment-doctor">
                    <Link to={`/patients`} >
                        Dotor -- {appointment?.userProfile?.fullName}
                    </Link>
                </div>

                <div className="appointment-patient">
                    <Link to={`/patients`} >
                        Patient -- {appointment?.creature?.name}
                    </Link>
                </div>

                <div className="appointment-date">
                    <Link to={`/patients`} >
                        Date -- {appointment.dateRequested}
                    </Link>
                </div>
            </Card>

        </>
    );
};

export default AppointmentCard;



