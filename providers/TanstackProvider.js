"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit"; // Adjust this path as necessary

// Create TanstackContext
const TanstackContext = createContext();

const TanstackProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // Start with an empty array

  // Load cart from local storage only after client-side rendering
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  const register = async (name, email, phone, password) => {
    try {
      const response = await HttpKit.registerUser({
        name,
        email,
        phone,
        password,
      });
      setUser(response.data); // Set user after registration
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await HttpKit.loginUser({ email, password });
      setUser(response.data); // Set user after login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <TanstackContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TanstackContext.Provider>
  );
};

// Custom hook to use TanstackContext
export const useTanstack = () => {
  return useContext(TanstackContext);
};

export default TanstackProvider;
