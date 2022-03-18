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
import SideMenuAdmin from "../../Components/SideMenuAdmin";

const TrainerRequest = () => {
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuAdmin />
      <div className="d-flex  w-100">
        <div className="w-50 "></div>
        <div className="d-flex justify-content-center w-50">
          <Button className="m-3">Approve Gym</Button>
          <Button className="m-3">Reject Gym</Button>
        </div>
      </div>
      <div className="trainer-desc-admin mt-3 d-flex flex-column">
        <div className="d-flex ">
          <div className="d-flex w-75 justify-content-between">
            <div className="trainer-img d-flex">
              <img src="../../../images/trainer.png" alt="" />
              <div className="d-flex mt-5 flex-column">
                <h4>Hamza Kasim</h4>
                <h4>Age:</h4>
                <h4>Gender:</h4>
              </div>
            </div>
            <div className="trainer-btn d-flex flex-column"></div>
          </div>
        </div>
        <div className="m-4 d-flex flex-column">
          <h4>Exercise Type:</h4>
          <h4>Qaulification and Certification:</h4>
          <h4>About:</h4>
          <p>
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerRequest;
