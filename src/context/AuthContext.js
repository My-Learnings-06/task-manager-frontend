import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi, signup as signupApi } from '../services/api'; // Import the login and signup functions

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const signup = async ({ name, email, password }) => {
        const response = await signupApi({ name, email, password });
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
    };

    const login = async ({ email, password }) => {
        const response = await loginApi({ email, password });
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};