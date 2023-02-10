import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import AppointmentCard from "./AppointmentCard";
import { getAllAppointments } from "../../modules/appointmentManager";

const AppointmentList = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    // will render appointments array that will be mapped over
    useEffect(() => {
        getAllAppointments().then((appointment) => setAppointments(appointment));
    }, []);

    return (
        <>

            <Button onClick={() => { navigate("/appointments/add") }}>Add</Button>

            <div className="container">
                <div className="row justify-content-center">
                    {appointments.map((appointment) => (
                        <AppointmentCard appointment={appointment} key={appointment.id} />
                    ))}
                </div>
            </div>

        </>
    );
}

export default AppointmentList;