import React, { useState } from "react";
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

const changePassSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  new_password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirm_password: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  // gender: yup.string().required("A radio option is required").nullable(),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passDetails, setPassDetails] = useState({
    _id: "",
    password: "",
    new_password: "",
  });

  const {
    register: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(changePassSchema),
  });

  const submitPassForm = (data) => {
    // setCustomerDetails({ ...customerDetails, gender: data.gender });
    const login_func = (passDetails) => {
      userService
        .update_pass(passDetails)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-gym d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={handleSubmitPassword(submitPassForm)}
          className="d-flex flex-column align-items-center justify-content-center form-step1 w-100 h-100"
        >
          <h2 className="text-center mb-3">Change Password</h2>
          <div className="inner-box-gym d-flex flex-column">
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Current password:</h3>
              <input
                type="text"
                {...controlPassword("password")}
                onChange={(e) => {
                  setPassDetails({
                    ...passDetails,
                    full_name: e.target.value,
                  });
                }}
              />
            </div>
            <p>{errorsGym.full_name?.message}</p>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Email:</h3>
              <input
                type="email"
                name="email"
                {...controlGym("email")}
                onChange={(e) => {
                  setGymDetails({
                    ...gymDetails,
                    user_id: { ...gymDetails.user_id, email: e.target.value },
                  });
                }}
              />
            </div>
            <p>{errorsGym.email?.message}</p>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Password:</h3>
              <input
                type="password"
                name="password"
                {...controlGym("password")}
                onChange={(e) => {
                  setGymDetails({
                    ...gymDetails,
                    user_id: { ...gymDetails.user_id, password: e.target.value },
                  });
                }}
              />
              <h3 className="p-4 pb-0">Confirm password:</h3>
              <input type="password" name="confirm_password" {...controlGym("confirm_password")} />
            </div>
            <p>{errorsGym.password?.message}</p>
            <p>{errorsGym.confirm_password?.message}</p>
          </div>

          <div className="buttons-gym d-flex justify-content-between mt-3">
            <Link className="step1-btn" to="/register">
              <Button>back</Button>
            </Link>

            <Button type="submit">Signup</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
