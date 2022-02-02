import React from "react";
import "../../styles/pages.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const GymRegister = () => {
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-gym d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Gym Signup</h2>
        <div className="inner-box-gym d-flex flex-column">
          <div className="d-flex flex-column">
            <h3 className="p-4 pb-0">Gym Name:</h3>
            <input type="text" />
          </div>
          <div className="d-flex flex-column">
            <h3 className="p-4 pb-0">Email:</h3>
            <input type="text" />
          </div>
          <div className="d-flex flex-column">
            <h3 className="p-4 pb-0">Password:</h3>
            <input type="password" />
          </div>
        </div>

        <div className="buttons-gym d-flex justify-content-between mt-3">
          <Link className="step1-btn" to="/register">
            <Button>back</Button>
          </Link>

          <Button>Signup</Button>
        </div>
      </div>
    </div>
  );
};

export default GymRegister;
