import React from "react";
import "../../styles/pages.css";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Signup as?</h2>
        <div className="inner-box d-flex flex-column justify-content-around ">
          <Link className="d-flex justify-content-center text-decoration-none" to="/register-user">
            <Button variant="primary">User</Button>
          </Link>
          <Link className="d-flex justify-content-center text-decoration-none " to="/register-user">
            <Button variant="primary">Trainer</Button>
          </Link>
          <Link className="d-flex justify-content-center text-decoration-none" to="/register-user">
            <Button variant="primary">Gym Owner</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
