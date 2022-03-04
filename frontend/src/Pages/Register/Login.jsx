import React, { useState } from "react";
import "../../styles/pages.css";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-login d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Sign in</h2>
        <div className="inner-box-login d-flex flex-column justify-content-around ">
          <form className="d-flex flex-column">
            <div className="input-text d-flex flex-column">
              <label for="lname">Email</label>
              <input
                type="email"
                id=""
                name=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label for="lname">Password</label>
              <input
                type="password"
                id=""
                name=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label for="lname">Sign in as</label>
            </div>
            <div className="d-flex mt-2 gender-radio justify-content-start">
              <input name="gender" type="radio" value="Male" />
              <h4>User</h4>
              <input name="gender" type="radio" value="Female" />
              <h4>Trainer</h4>
              <input name="gender" type="radio" value="Both" />
              <h4>Gym owner</h4>
            </div>

            <Button type="submit" className="mt-3 w-25">
              Sign in{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
