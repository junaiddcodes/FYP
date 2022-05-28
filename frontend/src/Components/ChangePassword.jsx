import React, { useEffect, useState } from "react";
import "../styles/pages.css";
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
import userService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import trainerService from "../services/TrainerService";
import gymService from "../services/GymService";

const changePassSchema = yup.object().shape({
  password: yup
    .string()
    // .min(8)
    .required("Password cant be empty")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  new_password: yup
    .string()
    // .min(8,"")
    .required("New password cant be empty")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirm_password: yup.string().oneOf([yup.ref("new_password"), null], "Passwords must match"),
  // gender: yup.string().required("A radio option is required").nullable(),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [newpasswordError, setNewPasswordError] = useState("");
  var userType = "";
  var passDetails = {
    _id: "",
    password: "",
    new_password: "",
  };

  useEffect(() => {
    userType = userService.getLoggedInUser().user_type;
    console.log(userType);
  });
  const {
    register: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(changePassSchema),
  });

  const submitPassForm = (data) => {
    passDetails = {
      ...passDetails,
      _id: userService.getLoggedInUser()._id,
      password: data.password,
      new_password: data.new_password,
    };
    if (data.password === data.new_password) {
      setNewPasswordError("New password cant be same as the current one");
    } else {
      if (userType == "customer") {
        userService
          .update_pass(passDetails)
          .then((data) => {
            console.log(data);
            console.log("Password changed");
            userService.logout();
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            setPasswordError("Current password is not valid");
          });
      } else if (userType == "trainer") {
        trainerService
          .update_pass(passDetails)
          .then((data) => {
            console.log(data);
            console.log("Password changed");
            userService.logout();
            navigate("/login");
          })
          .catch((err) => {
            console.log(err.toString());
            setPasswordError("Current password is not valid");
          });
      } else if (userType == "gym") {
        gymService
          .update_pass(passDetails)
          .then((data) => {
            console.log(data);
            console.log("Password changed");
            userService.logout();
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            setPasswordError("Current password is not valid");
          });
      }
    }
  };

  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-password d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={handleSubmitPassword(submitPassForm)}
          className="d-flex flex-column align-items-center justify-content-center form-step1 w-100 h-100"
        >
          <h2 className="text-center mb-3">Change Password</h2>
          <div className="inner-box-password d-flex flex-column">
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Current password:</h3>
              <input
                type="password"
                {...controlPassword("password")}
                // onChange={(e) => {
                //   setPassDetails({
                //     ...passDetails,
                //     password: e.target.value,
                //   });
                // }}
              />
            </div>
            <p>{errorsPassword.password?.message}</p>
            <p>{passwordError}</p>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">New password:</h3>
              <input
                type="password"
                name="new_password"
                {...controlPassword("new_password")}
                // onChange={(e) => {
                //   setPassDetails({
                //     ...passDetails,
                //     new_password: e.target.value,
                //   });
                // }}
              />
            </div>
            <p>{errorsPassword.new_password?.message}</p>
            <p>{newpasswordError}</p>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Confirm new password:</h3>
              <input
                type="password"
                name="confirm_password"
                {...controlPassword("confirm_password")}
              />

              {/* <p>{errorsPassword.new_password?.message}</p> */}
              <p>{errorsPassword.confirm_password?.message}</p>
            </div>
          </div>

          <div className="btn-sm buttons-gym d-flex justify-content-between mt-3">
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              back
            </Button>

            <Button className="btn-sm" type=" submit">
              Change password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
