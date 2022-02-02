import React from "react";
import "../../styles/pages.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const TrainerRegister = () => {
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-step1 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Trainer Signup</h2>
        <div className="inner-box-step1 d-flex ">
          <div className="d-flex flex-column w-50 ">
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Your Name:</h3>
              <input type="text" />
            </div>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Your DOB:</h3>
              <input type="text" placeholder="dd/mm/yyyy" />
            </div>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Your Gender:</h3>
              <div className="d-flex justify-content-around">
                <div className="radio w-25 d-flex ">
                  <input type="radio" name="gender" value="male" />
                  <p className="m-2">Male</p>
                </div>
                <div className="radio w-25 d-flex  ">
                  <input type="radio" name="gender" value="female" />
                  <p className="m-2">Female</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Email:</h3>
              <input type="text" />
            </div>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Password:</h3>
              <input type="password" />
            </div>
          </div>
        </div>

        <div className="buttons-trainer d-flex justify-content-between mt-3">
          <Link className="step1-btn" to="/register">
            <Button>back</Button>
          </Link>

          <Button>Signup</Button>
        </div>
      </div>
    </div>
  );
};

export default TrainerRegister;
