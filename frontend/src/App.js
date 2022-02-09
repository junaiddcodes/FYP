import React from "react";
import { Route, Routes, Redirect, BrowserRouter } from "react-router-dom";

import "./styles/pages.css";
import Register from "./Pages/Register/Register";
import UserRegister from "./Pages/Register/UserRegister";
import TrainerRegister from "./Pages/Register/TrainerRegister";
import GymRegister from "./Pages/Register/GymRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register-user" element={<UserRegister />} />
        <Route path="/register-trainer" element={<TrainerRegister />} />
        <Route path="/register-gym" element={<GymRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
