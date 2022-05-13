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

const GymDescription = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      // console.log("log in first");
    }
    if (
      userService.getLoggedInUser().user_type == "trainer" ||
      userService.getLoggedInUser().user_type == "gym" ||
      userService.getLoggedInUser().user_type == "admin"
    ) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Gym Description</h2>
      <div className="d-flex">
        <div className="gym-desc d-flex flex-column ">
          <img src="../../../images/dumbells.png" alt="" />
          <h4>Mister Hit Gym</h4>
          <h4>Membership Price:</h4>
          <h4>Gender:</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="gym-contact d-flex flex-column ">
          <h4>Contact No.</h4>
          <p>0310-4541569</p>
          <h4>Email</h4>
          <p>a@b.com</p>
          <h4>Location</h4>
          <p>Johar Town, Lahore</p>
        </div>
      </div>
    </div>
  );
};

export default GymDescription;
