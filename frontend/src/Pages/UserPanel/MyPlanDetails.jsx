import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdLocationPin, MdProductionQuantityLimits } from "react-icons/md";
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
import StripeContainer from "../../Components/Stripe/StripeContainer";

const MyPlanDetails = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [planDetails, setPlanDetails] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [showItem, setShowItem] = useState(false);
  var userId = "";
  // const data = location.state.e;
  var data = location.state.e;
  var order = {
    user_id: "",
    plan_id: "",
  };

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
      //   console.log("state data = ", location.state.e);
      setPlanDetails(location.state.e);
    }
    let arr = [];
    for (var i = 0; i < data.plan_duration; i++) {
      arr.push(planDetails);
      console.log(arr);
    }
    setAllPlans(arr);
    console.log("array = ", arr);
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <Button
        className="m-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class="bx bx-arrow-back m-1"></i> Back
      </Button>
      <h2> {planDetails.plan_title} plan</h2>

      <table className="activity-box table table-bordered table-dark">
        <thead>
          <tr>
            <th>Week</th>
            <th>Monday Activities</th>
            <th>Tuesday Activities</th>
            <th>Wednesday Activities</th>
            <th>Thursday Activities</th>
            <th>Friday Activities</th>
            <th>Saturday Activities</th>
            <th>Sunday Activities</th>
          </tr>
        </thead>
        <tbody>
          {allPlans.map((e, index) => {
            return (
              <tr className="activity-box">
                <td key={index}>{index + 1}</td>
                <td>{planDetails.monday_activities}</td>
                <td>{planDetails.tuesday_activities}</td>
                <td>{planDetails.wednesday_activities}</td>
                <td>{planDetails.thursday_activities}</td>
                <td>{planDetails.friday_activities}</td>
                <td>{planDetails.saturday_activities}</td>
                <td>{planDetails.sunday_activities}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyPlanDetails;
