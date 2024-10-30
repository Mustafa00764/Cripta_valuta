import React from 'react'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const SearchContext = createContext();


const SearchProvider = ({ children }) => {
  const [mobileSearch,setMobileSearch] = useState(false)

  return (
    <SearchContext.Provider value={{mobileSearch,setMobileSearch}}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider