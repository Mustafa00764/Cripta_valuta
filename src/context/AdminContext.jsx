import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { dark } from '@mui/material/styles/createPalette';
import api from '../components/axiosRefresh.js'

export const AdminContext = createContext();


const AdminProvider = ({ children }) => {
  const [theme, setTheme] = useState(false)
  const [sort, setSort] = useState(10)
  const [image, setImage] = useState(null)
  const [postered, setPostered] = useState(null)
  const [titled, setTitled] = useState("")
  const [subtitled, setSubtitled] = useState("")
  const [categories, setCategories] = useState([])
  const [pubDate, setPubDate] = useState("")
  const [conclusione, setConclusione] = useState("")
  const [main, setMain] = useState("<p><br></p>")

  const toggleTheme = () => {
    const newTheme = theme ? 'dark' : 'light';
    setTheme(!theme);

    document.documentElement.style.setProperty(
      '--background-color',
      newTheme === 'light' ? '#fff' : '#0C1013'
    );
    document.documentElement.style.setProperty(
      '--text-color',
      newTheme === 'light' ? '#000' : '#fff'
    );
    document.documentElement.style.setProperty(
      '--page-color',
      newTheme === 'light' ? '#F4F7FF' : '#11161A'
    );

    document.documentElement.style.setProperty(
      '--shadow-color',
      newTheme === 'light' ? '0px 4px 50px 0px #E1E9FF' : '0px 4px 50px 0px #000000'
    );
    
    document.documentElement.style.setProperty(
      '--shadowBtn-color',
      newTheme === 'light' ? [
        '0px 4px 15px 0px #E1E9FF80',
        '0px 4px 20px 0px #E1E9FF1A inset'
      ] : [
        '0px 4px 15px 0px #000000',
        '0px 4px 20px 0px #000000 inset'
      ]
    );
    document.documentElement.style.setProperty(
      '--element-color',
      newTheme === 'light' ? '#E9EEFE' : '#0C1013'
    );

    document.documentElement.style.setProperty(
      '--blur-color',
      newTheme === 'light' ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.6)'
    );
    
  };

  const handleRestore = async () => {

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      alert("Вы не авторизованы!");
      return;
    }

    try {
      
      const response = await api.get("/categories",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setCategories(response.data)
    } catch (error) {

      console.log(error);

    }
  }

  useEffect(()=>{
    toggleTheme()
  },[])

  return (
    <AdminContext.Provider value={{theme, setTheme,handleRestore,conclusione,setConclusione, sort, setSort,setPostered,postered,toggleTheme, setCategories,setMain,setImage,setPubDate,setSubtitled,setTitled,image,main,categories,pubDate,titled,subtitled}}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider