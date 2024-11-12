import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setIsAuthenticated(true);
      // Логика для получения данных о пользователе
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('accessToken', userData.accessToken);
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{user, setUser,setIsAuthenticated, isAuthenticated, handleLogin}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider