import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import  {useState, useEffect, useCallback } from "react";

import api from "../api";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants"

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const refreshTokenFunc = useCallback( async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/auth/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }

        }
        catch (error) {
            setIsAuthorized(false);
        }
    }, [])
    
    const auth = useCallback(async ()=> {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshTokenFunc();
        }
        else {
            setIsAuthorized(true)
        }
    }, [refreshTokenFunc]);

    useEffect(() => {
        const authenticate = async () => {
            try{
                await auth();
            }
            catch (error) {
                setIsAuthorized(false)
            }
        };
        authenticate();
    }, [auth])

    if (isAuthorized === null) {
        return <div> Loading ...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />


}

export default ProtectedRoute;