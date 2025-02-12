"use client";

import { authorize } from "@/api/auth";
import { enqueueSnackbar } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const authorizeUser = async (_token) => {
    if (!_token) return;
    try {
      const response = await authorize(_token);
      if (response?.success) {
        setUser(response?.user);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || error?.message, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");
    if (token) {
      console.log("token saved in context", token);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) authorizeUser(token);
  }, [token]);

  return (
    <GlobalContext.Provider value={{ user, setUser, setToken }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};
