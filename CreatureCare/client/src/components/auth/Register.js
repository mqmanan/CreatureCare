import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Registr() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                firstName,
                lastName,
                imageLocation,
                email,
            };
            register(userProfile, password).then(() => navigate("/"));
        }
    };

    return (
        <div >
            <fieldset>
                <div className="firstName">First Name</div>
                <input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <div className="lastName">Last Name</div>
                <input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <div className="email">Email</div>
                <input
                    id="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <div className="imageLocation">Profile Image URL</div>
                <input
                    id="imageLocation"
                    type="text"
                    onChange={(e) => setImageLocation(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <div className="password">Password</div>
                <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <div className="confirmPassword">Confirm Password</div>
                <input
                    id="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <div className="password">Password</div>
                <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </fieldset>


            <button className="login-button"
                type="submit"
                onClick={(event) => { registerClick(event) }}
            >
                Register
            </button>

        </div>
    );
}