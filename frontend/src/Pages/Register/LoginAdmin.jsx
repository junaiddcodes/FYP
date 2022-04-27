import React, { useEffect, useState } from "react";
import "../../styles/pages.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/AdminService";
import gymService from "../../services/GymService";
const schema = yup.object().shape({
  Email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});
const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  var role = "admin";
  // const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    adminService
      .login(email, password, role)
      .then((token) => {
        navigate("/admin-dashboard");
      })
      .catch((err) => {
        console.log(err.toString());
        setAuthError(`No admin account exists for this email!`);
      });
  };
  useEffect(() => {
    console.log("abdullah taxi");
    gymService
      .get_all_gyms()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-login d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Sign in Admin</h2>
        <div className="inner-box-login d-flex flex-column justify-content-around ">
          <form onSubmit={handleSubmit(submitForm)} className="d-flex flex-column">
            <div className="input-text d-flex flex-column">
              <label>Email</label>
              <input
                type="email"
                name="Email"
                value={email}
                {...register("Email")}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p>{errors.Email?.message}</p>
              <label>Password</label>
              <input
                type="password"
                name="password"
                {...register("password")}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p>{errors.password?.message}</p>
            </div>

            <p>{authError}</p>
            <Button type="submit" className="mt-3 w-25">
              Sign in{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
