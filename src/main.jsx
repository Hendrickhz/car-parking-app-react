import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/assets/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/views/Home";
import Register from "@/views/auth/Register";
import { route } from "@/routes";
import VehiclesList from "@/views/vehicles/VehiclesList";
import axios from "axios";
import Login from "@/views/auth/Login";
import ActiveParkings from "./views/parkings/ActiveParkings";
import EditProfile from "./views/profile/EditProfile";
import ChangePassword from "./views/profile/ChangePassword";
import CreateVehicle from "./views/vehicles/CreateVehicle";
import EditVehicle from "./views/vehicles/EditVehicle";
import OrderParking from "./views/parkings/OrderParking";
import ParkingHistory from "./views/parkings/ParkingHistory";
import ParkingDetails from "./views/parkings/ParkingDetails";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={route("home")} element={<App />}>
          <Route index element={<Home />} />
          <Route path={route("register")} element={<Register />} />
          <Route path={route("login")} element={<Login />} />
          <Route path={route("vehicles.index")} element={<VehiclesList />} />
          <Route path={route("vehicles.create")} element={<CreateVehicle />} />
          <Route path={route("vehicles.edit")} element={<EditVehicle />} />
          <Route path={route("profile.edit")} element={<EditProfile />} />
          <Route
            path={route("profile.change-password")}
            element={<ChangePassword />}
          />
          <Route path={route("parkings.active")} element={<ActiveParkings />} />
          <Route path={route("parkings.create")} element={<OrderParking />} />
          <Route path={route("parkings.history")} element={<ParkingHistory />} />
          <Route path={route("parkings.show")} element={<ParkingDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
