import { Navigate } from "react-router-dom";
import { useState } from "react";


function NotFound() {

    const [navigate, setNavigate] = useState(false);

    function goHome() {
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/" />;
    }
    
    return (
        <>
            <div>
                <h1>Not Found </h1>
                <p> The requested page doesn't exist </p>
            </div>
            
            <p> <button onClick={goHome}> Home </button> </p>
        </>
    )
}

export default NotFound;