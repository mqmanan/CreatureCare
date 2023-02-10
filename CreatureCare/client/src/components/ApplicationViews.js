import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Hello from "./homeNavBar/Hello";
import CreatureList from "./creatures/CreatureList";
import EditCreature from "./creatures/EditCreature";
import AddCreature from "./creatures/AddCreature";
import CreatureDetails from "./creatures/CreatureDetails";
import AppointmentList from "./appoinments/AppointmentList";


export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">

                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />} />

                    <Route path="patients" element={<CreatureList />} />

                    <Route path="patients/add" element={<AddCreature />} />

                    <Route path="patients/:id" element={<CreatureDetails />} />

                    <Route path="patients/:id/edit" element={<EditCreature />} />

                    <Route path="appointments" element={<AppointmentList />} />

                    <Route path="appointments/add" element={<AddCreature />} />

                    <Route path="login" element={<Login />} />

                    <Route path="register" element={<Register />} />

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />

                </Route>
            </Routes>
        </main>
    );
};

