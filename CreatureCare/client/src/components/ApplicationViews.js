import React from "react";
// import { BrowserRouter as Routes, Route, Navigate, } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CreatureList from "./CreatureList";
import EditCreature from "./EditCreature";
import AddCreature from "./AddCreature";
import CreatureDetails from "./CreatureDetails";


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

                    <Route path="login" element={<Login />} />

                    <Route path="register" element={<Register />} />

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />

                </Route>
            </Routes>
        </main>
    );
};

