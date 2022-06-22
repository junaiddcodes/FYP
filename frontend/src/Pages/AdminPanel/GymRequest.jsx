import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenuAdmin from "../../Components/SideMenuAdmin";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import gymService from "../../services/GymService";
import userService from "../../services/UserService";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const GymRequest = () => {
  // const schema = yup.object().shape({
  //   latitude: yup
  //     .number()
  //     .typeError("latitude cant be empty")
  //     .positive("latitude cant be negative")
  //     .min(-90, "latitude cant be less than -90")
  //     .max(90, "latitude cant be more than 90")
  //     .required(),
  //   longitude: yup
  //     .number()
  //     .typeError("longitude cant be empty")
  //     .positive("longitude cant be negative")
  //     .min(-180, "longitude cant be less than -180")
  //     .max(180, "longitude cant be more than 180")
  //     .required(),
  //   // .nullable(),
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.e;
  var gymProfileDetails = {
    listed: "",
  };

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));

    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      if (
        userService.getLoggedInUser().user_type == "customer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "trainer"
      ) {
        navigate("/login");
      }
    }
  }, []);
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuAdmin />
      <Button
        className="m-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class="bx bx-arrow-back m-1"></i> Back
      </Button>
      <h2>Gym Request</h2>

      {/* <form onSubmit={handleSubmit(submitProfileGym)}> */}
      <div className="d-flex  w-100">
        <div className="w-50 "></div>
        <div className="d-flex justify-content-center w-50">
          <Button
            className="m-3"
            onClick={() => {
              gymProfileDetails = {
                ...gymProfileDetails,
                listed: "listed",
              };
              gymService
                .update_gym(gymProfileDetails, data._id)
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log(gymProfileDetails);
              navigate("/admin-dashboard");
            }}
          >
            Approve Gym
          </Button>
          <Button
            className="m-3"
            onClick={() => {
              gymProfileDetails = {
                ...gymProfileDetails,
                listed: "rejected",
              };
              gymService
                .update_gym(gymProfileDetails, data._id)
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log(gymProfileDetails);
              navigate("/admin-dashboard");
            }}
          >
            Reject Gym
          </Button>
        </div>
      </div>
      <div className="gym-desc-admin d-flex flex-column ">
        <img src="../../../images/dumbells.png" alt="" />
        <h4>Name: {data.user_id.full_name}</h4>
        <h4>Membership price: {data.gym_membership_price} pkr</h4>
        <h4>Gender: {data.gender_facilitation}</h4>
        <h4>Gym Description: </h4>
        <p>{data.gym_desc}</p>
        <div className="d-flex flex-column ">
          <h4>Contact No.</h4>
          <p>{data.gym_contact_no}</p>
          <h4>Email</h4>
          <p>{data.user_id.email}</p>
          <h4>Location</h4>
          <p>
            {data.location.address} , {data.location.city} , {data.location.state}
          </p>

          {/* <div className="mt-3 p-3">
              <div className="mt-2">
                <TextField
                  id="demo-simple-select-2"
                  className=""
                  label="Latitude"
                  variant="outlined"
                  name="latitude"
                  {...register("latitude")}
                  placeholder="Enter Latitude"
                  InputLabelProps={{
                    style: { color: "#777" },
                  }}
                />
                <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                  {errors.latitude?.message}
                </p>
              </div>
              <div className="mt-2">
                <TextField
                  id="demo-simple-select-2"
                  className=""
                  label="Longitude"
                  variant="outlined"
                  name="longitude"
                  {...register("longitude")}
                  placeholder="Enter Longitude"
                  InputLabelProps={{
                    style: { color: "#777" },
                  }}
                />
                <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                  {errors.longitude?.message}
                </p>
              </div>
            </div> */}
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default GymRequest;
