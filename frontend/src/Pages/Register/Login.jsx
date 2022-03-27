import React, { useState } from "react";
import "../../styles/pages.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  Email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  role: yup.string().required("A radio option is required").nullable(),
});
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  // const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data.role);

    userService
      .login(email, password, data.role)
      .then((token) => {
        // console.log(token);
        if (data.role == "customer") navigate("/user-dashboard");
        if (data.role == "trainer") navigate("/trainer-dashboard");
        if (data.role == "gym") navigate("/gym-dashboard");
      })
      .catch((err) => {
        console.log(err.toString());
        setAuthError(`No ${data.role} account exists for this email!`);
      });
  };
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-login d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Sign in</h2>
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
              <label for="">Sign in as</label>
            </div>
            <div className="d-flex mt-2 gender-radio justify-content-start">
              <input name="role" type="radio" value="customer" {...register("role")} />
              <h4>User</h4>
              <input name="role" type="radio" value="trainer" {...register("role")} />
              <h4>Trainer</h4>
              <input name="role" type="radio" value="gym" {...register("role")} />
              <h4>Gym owner</h4>
            </div>
            <p>{errors.role?.message}</p>
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

export default Login;
