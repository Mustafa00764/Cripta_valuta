import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider