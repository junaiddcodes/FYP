import React from "react";
import "../../styles/pages.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const gymSchema = yup.object().shape({
  full_name: yup.string().min(3).max(32).required(),
  email: yup.string().min(3).required().email(),
  password: yup.string().min(8).required(),
  gender: yup.string().required("A radio option is required").nullable(),
});

const GymRegister = () => {
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-gym d-flex flex-column justify-content-center align-items-center">
        <form >
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
        </form>
      </div>
    </div>
  );
};

export default GymRegister;
