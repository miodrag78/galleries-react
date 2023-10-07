import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar";
import UserProvider from "./storage/UserProvider";
import GalleryProvider from "./storage/GalleryProvider";git
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
    <GalleryProvider>
    <BrowserRouter>
    <Navbar />
      <App />
    </BrowserRouter>
    </GalleryProvider>
    </UserProvider>
  </React.StrictMode>
);