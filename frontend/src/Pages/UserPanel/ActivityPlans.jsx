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
import SideMenu from "../../Components/SideMenu";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";

const ActivityPlans = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      if (
        userService.getLoggedInUser().user_type == "trainer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
      // console.log("log in first");
    }
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Activity Plans by Hamza Kasim:</h2>
      <div className=" mt-5">
        <div className="activity-grid-container">
          <div className="activity-card grid-item p-3">
            <h4>30 Days Activity Plan</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <h4>Duration:</h4>
                <p>30 days</p>
              </div>
              <div>
                <h4>Price:</h4>
                <p>Rs 5000</p>
              </div>
            </div>
          </div>
          <div className="activity-card grid-item p-3">
            <h4>30 Days Activity Plan</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <h4>Duration:</h4>
                <p>30 days</p>
              </div>
              <div>
                <h4>Price:</h4>
                <p>Rs 5000</p>
              </div>
            </div>
          </div>
          <div className="activity-card grid-item p-3">
            <h4>30 Days Activity Plan</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <h4>Duration:</h4>
                <p>30 days</p>
              </div>
              <div>
                <h4>Price:</h4>
                <p>Rs 5000</p>
              </div>
            </div>
          </div>
          <div className="activity-card grid-item p-3">
            <h4>30 Days Activity Plan</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <h4>Duration:</h4>
                <p>30 days</p>
              </div>
              <div>
                <h4>Price:</h4>
                <p>Rs 5000</p>
              </div>
            </div>
          </div>
          <div className="activity-card grid-item p-3">
            <h4>30 Days Activity Plan</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <div className="d-flex justify-content-between">
              <div>
                <h4>Duration:</h4>
                <p>30 days</p>
              </div>
              <div>
                <h4>Price:</h4>
                <p>Rs 5000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPlans;
