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

const PaymentRequest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login/admin");
      // console.log("log in first");
    }
    if (
      userService.getLoggedInUser().user_type == "customer" ||
      userService.getLoggedInUser().user_type == "gym" ||
      userService.getLoggedInUser().user_type == "trainer"
    ) {
      navigate("/login/admin");
    }
  }, []);
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenu />
      <h2>Payment Requests</h2>
      <div className="admin-box mt-3 d-flex flex-column">
        <h4 className="mt-2">Trainer Id: </h4>
        <h4 className="mt-2">Trainer Name: </h4>
        <h4 className="mt-2">Bank Name: </h4>
        <h4 className="mt-2">Bank Account: </h4>
        <h4 className="mt-2">Requested Amount: </h4>
        <Button type="submit" className="w-25 mt-3">
          Mark as complete
        </Button>
      </div>
    </div>
  );
};

export default PaymentRequest;
