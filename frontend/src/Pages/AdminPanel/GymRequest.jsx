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
const GymRequest = () => {
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

    if (localStorage.getItem("token") == null) {
      navigate("/login");
      // console.log("log in first");
    }
  }, []);
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuAdmin />
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
          <p>{data.location}</p>
        </div>
      </div>
    </div>
  );
};

export default GymRequest;
