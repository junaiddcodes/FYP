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
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../../services/UserService";
import trainerService from "../../services/TrainerService";

const ActivityPlanDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allPlans, setAllPlans] = useState([]);
  // const data = location.state.e;
  var data = location.state.e;
  var userId = "";
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      userId = userService.getLoggedInUser()._id;
      if (
        userService.getLoggedInUser().user_type == "trainer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }

    if (location.state) {
      // data = location.state.trainerDetails;
      console.log("state data = ", location.state.e);
      data = location.state.e;
    } else {
      console.log("state empty");
    }
    // console.log(location.state.e);
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2> {data.plan_title} plan</h2>
      <div className="trainer-desc mt-3 d-flex flex-column">
        <div className="d-flex ">
          <div className="d-flex w-75 justify-content-between">
            <div className="trainer-img d-flex">
              <div className="d-flex mt-5 flex-column">
                <h4>Duration: {data.plan_duration} weeks</h4>
                <h4>Price: {data.plan_price} PKR</h4>
                <h4>Description: </h4>
                <p> {data.plan_desc}</p>
                <Button className="w-25 m-3">Buy plan</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPlanDetails;
