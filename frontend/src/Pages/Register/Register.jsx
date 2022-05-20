import React from "react";
import "../../styles/pages.css";
import { GiBiceps } from "react-icons/gi";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-register d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Signup as?</h2>
        <div className="inner-box-register d-flex flex-column justify-content-around ">
          <Link className="d-flex justify-content-center text-decoration-none" to="/register-user">
            <Button variant="primary w-75">
              <i className="ml-2 bx bxs-user"></i>
              <span className="m-2">User </span>
            </Button>
          </Link>
          <Link
            className="d-flex justify-content-center text-decoration-none "
            to="/register-trainer"
          >
            <Button variant="primary w-75">
              <GiBiceps />
              <span className="m-2">Trainer</span>
            </Button>
          </Link>
          <Link className="d-flex justify-content-center text-decoration-none" to="/register-gym">
            <Button variant="primary w-75">
              <i class="bx bx-dumbbell"></i>
              <span className="m-2">Gym Owner </span>
            </Button>
          </Link>
        </div>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <p className="text-light mt-3">
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
