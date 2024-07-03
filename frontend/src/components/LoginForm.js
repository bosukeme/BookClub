import { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css";
import { Link, useNavigate } from "react-router-dom";


function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const route = "/api/auth/token/"


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        

        try {
            const res = await api.post(route, {username, password});
            if (res.data.access && res.data.refresh) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                alert("Login failed: Invalid response from server.");
            }
        }
        catch (error) {
            if (error.response) {
                alert(`Login failed: Wrong Username or Password`);
            } else {
                alert("Login failed: Network or server error.");
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                className = "form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            
            <input
                className = "form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />

            
            <button className="form-button" type="submit" disabled={loading}> Login Here </button>

            <p>Dont have an account yet? &nbsp;
                <Link to="/register">
                Register here
                </Link>
            </p>
                
        </form>
    )
}


export default LoginForm;