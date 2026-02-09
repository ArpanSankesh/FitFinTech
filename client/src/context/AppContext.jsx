import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    // State to store the token and user data
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://fitfintech-xfc0.onrender.com";

    // Function to Login
    const login = async (email, password) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success("Login Successful!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(false);
        toast.success("Logged Out");
    }

    const value = {
        token, setToken, backendUrl, login, logout
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;