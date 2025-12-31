import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    
    // State to store the token and user data
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const backendUrl = "http://192.168.0.102:5000";

    // Function to Login
    const login = async (email, password) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

            if (data.success) {
                localStorage.setItem('token', data.token); // Save to browser storage
                setToken(data.token);
                toast.success("Login Successful!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to Logout
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