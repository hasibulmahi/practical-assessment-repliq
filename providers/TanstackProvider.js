"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit"; // Adjust this path as necessary
import { toast } from 'react-toastify'; // Import toast notification

// Create TanstackContext
const TanstackContext = createContext();

// Define TanstackProvider component
const TanstackProvider = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [user, setUser] = useState(null);

    // Optional: Use localStorage to persist user session
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const register = async (name, email, phone, password) => {
        try {
            const response = await HttpKit.registerUser({ name, email, phone, password });
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data)); // Persist user data
            toast.success("Registration successful!"); // Show success toast
        } catch (error) {
            console.error("Registration failed", error);
            toast.error("Registration failed. Please try again."); // Show error toast
        }
    };

    const login = async (email, password) => {
        try {
            const response = await HttpKit.loginUser({ email, password });
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data)); // Persist user data
            toast.success("Login successful!"); // Show success toast
        } catch (error) {
            console.error("Login failed", error);
            toast.error("Login failed. Please check your credentials."); // Show error toast
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user data from localStorage
        toast.info("You have logged out."); // Show logout toast
    };

    return (
        <TanstackContext.Provider value={{ user, register, login, logout }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </TanstackContext.Provider>
    );
};

// Custom hook to use TanstackContext
export const useTanstack = () => {
    return useContext(TanstackContext);
};

export default TanstackProvider;
