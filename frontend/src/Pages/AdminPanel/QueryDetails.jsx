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

const QueryDetails = () => {
  const navigate = useNavigate();

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
      <h2>Query Details</h2>
      <div className="admin-box d-flex flex-column">
        <h4 className="mt-2">Query Id: </h4>
        <h4 className="mt-2">User Id: </h4>
        <h4 className="mt-2">User Name: </h4>
        <h4 className="mt-2">User Type: </h4>
        <h4 className="mt-2">Query Subject: </h4>
        <h4 className="mt-2">Query Details: </h4>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        <h4 className="mt-2">Admin Response: </h4>
        <textarea className="text-field mt-2" placeholder="Enter your response" />
        <Button type="submit" className="w-25 mt-3">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default QueryDetails;
