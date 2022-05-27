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

const gymSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(4, "Name must be of at least 4 characters")
    .max(25, "Name must be of at most 25 characters")
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name "),
  email: yup
    .string()
    .min(7, "Email must be of at least 7 characters")
    .max(30, "Email must of at most 30 characters")
    .required()
    .email(),
  password: yup
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

const GymRegister = () => {
  const navigate = useNavigate();
  const [gymDetails, setGymDetails] = useState({
    user_id: {
      full_name: "",
      email: "",
      password: "",
      user_type: "gym",
    },
    // listed: false,
    // location: "lahore",
    // gym_desc: "very noice gym",
    // gym_contact_no: "03001234567",
    // gym_membership_price: "2000",
    // gender_facilitation: "both",
    // gym_photo: "photo",
  });

  const {
    register: controlGym,
    handleSubmit: handleSubmitGym,
    formState: { errors: errorsGym },
  } = useForm({
    resolver: yupResolver(gymSchema),
  });

  const submitGymForm = (data) => {
    // setCustomerDetails({ ...customerDetails, gender: data.gender });
    const login_func = (customerDetails) => {
      userService
        .login(
          customerDetails.user_id.email,
          customerDetails.user_id.password,
          customerDetails.user_id.user_type
        )
        .then((token) => {
          // console.log(token);
          navigate("/gym-dashboard");
        })
        .catch((err) => {
          console.log(err.toString());
          // setAuthError(`No ${data.role} account exists for this email!`);
        });
    };
    // setStep1(false);
    // setStep2(true);

    console.log(data.full_name);

    console.log("before request");
    userService
      .register_gym(gymDetails)
      .then((data) => {
        console.log(data);
        // props.history.push("/login");
        login_func(gymDetails);
        // navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
    console.log("after request");
  };

  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-gym d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={handleSubmitGym(submitGymForm)}
          className="d-flex flex-column align-items-center justify-content-center form-step1 w-100 h-100"
        >
          <h2 className="text-center mb-3">Gym Signup</h2>
          <div className="inner-box-gym d-flex flex-column">
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Gym Name:</h3>
              <input
                type="text"
                {...controlGym("full_name")}
                onChange={(e) => {
                  setGymDetails({
                    ...gymDetails,
                    user_id: { ...gymDetails.user_id, full_name: e.target.value },
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

export default GymRegister;
