import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CryptoProvider from "./context/CryptoContext.jsx";
import MenuProvider from "./context/MenuContext.jsx";
import AdminProvider from "./context/AdminContext.jsx";
import { StyledEngineProvider } from '@mui/material/styles';
import { global } from 'global';
import SearchProvider from "./context/SearchContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <SearchProvider>
        <AdminProvider>
          <MenuProvider>
            <CryptoProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CryptoProvider>
          </MenuProvider>
        </AdminProvider>
      </SearchProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
