import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../modules/authManager";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <>
            <div>
                <fieldset>
                    <div className="email">Email</div>
                    <input
                        id="email"
                        type="text"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
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
                    onClick={(event) => { loginSubmit(event) }}
                >
                    Login
                </button>

                <div>
                    Not registered? <Link to="register">Register</Link>
                </div>
            </div>

        </>
    );
}