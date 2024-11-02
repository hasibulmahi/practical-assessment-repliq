'use client'
import React, { createContext, useContext, useState } from 'react';
import HttpKit from './HttpKit';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const register = async (name, email, phone, password) => {
        try {
            const response = await HttpKit.registerUser({ name, email, phone, password });
            setUser(response.data);
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await HttpKit.loginUser({ email, password });
            setUser(response.data);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
