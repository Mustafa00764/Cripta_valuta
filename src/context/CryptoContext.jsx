import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const CryptoContext = createContext();


const CryptoProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastName, setLastName] = useState('');


  // Function to fetch data from the API
  // const fetchData = async (symbol) => {
  //   try {
  //     const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
  //     setData(response.data);
  //     setError(null);  // Clear any previous errors
  //   } catch (err) {
  //     setError('Error fetching data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(); // Fetch data initially
  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 4000);
  //   return () => clearInterval(intervalId);
  // }, [fetchData]);


  return (
    <CryptoContext.Provider value={{data}}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoProvider