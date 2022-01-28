import React from "react";
import { Route, Routes, Redirect, BrowserRouter } from "react-router-dom";

import "./styles/pages.css";
import Register from "./Pages/Register/Register";
import UserRegister from "./Pages/Register/UserRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register-user" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
