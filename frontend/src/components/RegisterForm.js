import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";
import "../styles/Form.css";
// import { useNavigate } from "react-router";


function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const route = "/auth/register/"

    const validateUsername = (username) => {
        if (username.length < 4 || username.length > 10) {
            return "      * Username should be between 4 and 10 characters long";
        }
        return '';
    };

    const validatePassword = (password) => {
        if (password.length < 6 || password.length > 12 || !/[A-Z]/.test(password)) {
            return "Password should be between 6 and 12 characters long and must have 1 capital letter";
        }
        return '';
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            username: validateUsername(value)
        }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: validatePassword(value)
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);

        if (usernameError || passwordError) {
            setErrors({ username: usernameError, password: passwordError });
            setLoading(false);
            return;
        }

        try {
            await api.post(route, {username, email, password})
            navigate("/login")
        }
        catch (error) {
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>
            <input
                className = "form-input"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
            />

            {errors.username && <p className="error-message">{errors.username}</p>}
            
            <input
                className = "form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className = "form-input"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
            />

            {errors.password && <p className="error-message">{errors.password}</p>}
            
            <button className="form-button" type="submit" disabled={loading}> Register Here </button>

            <p>Already have an account? &nbsp;
                <Link to="/login">
                Login here
                </Link>
            </p>
                
        </form>
    )
}


export default RegisterForm;