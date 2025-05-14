import { CssBaseline } from "@mui/material";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About.tsx";
import App from "./App.tsx";
import Home from "./Home.tsx";
import "./styles/index.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/about' element={<About />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
