import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Hello from "./homeNavBar/Hello";
import PatientList from "./creatures/PatientList";
import AddPatientForm from "./creatures/AddPatientForm";
import EditPatientForm from "./creatures/EditPatientForm";
import PatientDetails from "./creatures/PatientDetails";
import AppointmentList from "./appoinments/AppointmentList";
import AppointmentDateTime from "./appoinments/AppointmentDateTime";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">

                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />} />

                    {/* <Route path="staff" element={<Hello />} /> */}

                    <Route path="patients" element={<PatientList />} />

                    <Route path="patients/add" element={<AddPatientForm />} />

                    <Route path="patients/:id" element={<PatientDetails />} />

                    <Route path="patients/:id/edit" element={<EditPatientForm />} />

                    <Route path="appointments" element={<AppointmentList />} />

                    <Route path="appointments/add" element={<AppointmentDateTime />} />

                    {/* <Route path="profile" element={<PatientList />} />

                    <Route path="profile/details" element={<PatientList />} /> */}

                    <Route path="login" element={<Login />} />

                    {/* <Route path="register" element={<Register />} /> */}

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />

                </Route>
            </Routes>
        </main >
    );
};

