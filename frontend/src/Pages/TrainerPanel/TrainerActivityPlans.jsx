import React, { useState } from "react";
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
import SideMenuTrainer from "../../Components/SideMenuTrainer";
import { Link } from "react-router-dom";

const TrainerActivityPlans = () => {
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenuTrainer />
      <h2>Activity Plans</h2>
      <Link to="/trainer-create-plan">
        <Button className="mt-3"> Create Plan</Button>
      </Link>
      <div className="mt-5">
        <div className="activity-grid-container">
          <div className="activity-card grid-item p-3">
            <div className="d-flex ">
              <div className=" w-75"></div>
              <div className="d-flex w-25 justify-content-around">
                <Button className="btn btn-warning btn-sm mr-2">Edit</Button>
                <a className="delete-icon m-1">
                  <ImCross />
                </a>
              </div>
              <div></div>
            </div>
            <h4 className="mt-2">30 Days Activity Plan</h4>
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

export default TrainerActivityPlans;
