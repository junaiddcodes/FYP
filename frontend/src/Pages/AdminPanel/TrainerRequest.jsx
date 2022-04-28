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
import trainerService from "../../services/TrainerService";

const TrainerRequest = () => {
  const [trainerAge, setTrainerAge] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.e;
  var trainerProfileDetails = {
    listed: "",
  };
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      // console.log("log in first");
      setTrainerAge(getAge(data.dob));
    }
  }, []);
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
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
              trainerProfileDetails = {
                ...trainerProfileDetails,
                listed: "listed",
              };
              trainerService
                .update_trainer(trainerProfileDetails, data._id)
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log(trainerProfileDetails);
              navigate("/admin-dashboard");
            }}
          >
            Approve Trainer
          </Button>
          <Button
            className="m-3"
            onClick={() => {
              trainerProfileDetails = {
                ...trainerProfileDetails,
                listed: "rejected",
              };
              trainerService
                .update_trainer(trainerProfileDetails, data._id)
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log(trainerProfileDetails);
              navigate("/admin-dashboard");
            }}
          >
            Reject Trainer
          </Button>
        </div>
      </div>
      <div className="trainer-desc-admin mt-3 d-flex flex-column">
        <div className="d-flex ">
          <div className="d-flex w-75 justify-content-between">
            <div className="trainer-img d-flex">
              <img src="../../../images/trainer.png" alt="" />
              <div className="d-flex mt-5 flex-column">
                <h4>Name: {data.user_id.full_name}</h4>
                <h4>Age: {trainerAge} </h4>
                <h4>Gender: {data.gender}</h4>
              </div>
            </div>
            <div className="trainer-btn d-flex flex-column"></div>
          </div>
        </div>
        <div className="m-4 d-flex flex-column">
          <h4>Exercise Type: {data.exercise_type}</h4>

          <h4>About:</h4>
          <p>{data.trainer_desc}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerRequest;
