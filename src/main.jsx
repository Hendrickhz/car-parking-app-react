import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/assets/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/views/Home";
import Register from "@/views/auth/Register";
import { route } from "@/routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={route('home')} element={<App />}>
          <Route index element={<Home />} />
          <Route path={route('register')} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
