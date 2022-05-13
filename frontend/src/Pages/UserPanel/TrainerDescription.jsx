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
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import trainerService from "../../services/TrainerService";

const TrainerDescription = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const trainerId = useParams();
  const [trainerDetails, setTrainerDetails] = useState({
    user_id: { full_name: "", email: "" },
    exercise_type: "",
    gender: "",
    certificate_file: "",
    trainer_desc: "",
    trainer_photo: "",

  });

  function getTrainer(){
    trainerService.get_one_trainer(trainerId.id).then((res)=>{
      setTrainerDetails(res.crud)
      console.log(res)
    })
  }
  useEffect(getTrainer,[])
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Trainer Description</h2>
      <div className="trainer-desc mt-3 d-flex flex-column">
        <div className="d-flex ">
          <div className="d-flex w-75 justify-content-between">
            <div className="trainer-img d-flex">
              <img src={trainerDetails.trainer_photo} alt="" width="400" />
              <div className="d-flex mt-5 flex-column">
                <h4>{trainerDetails.user_id.full_name}</h4>
                <h4>Age:</h4>
                <h4>Gender: {trainerDetails.gender}</h4>
              </div>
            </div>
            <div className="trainer-btn d-flex flex-column">
              <Button className="mt-5">Message</Button>
              <Link to="/activity-plans">
                <Button className="mt-5">View Plan</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="m-4 d-flex flex-column">
          <h4>Exercise Type:{trainerDetails.exercise_type}</h4>
          <h4>Qaulification and Certification:{trainerDetails.certificate_file}</h4>
          <h4>About: </h4>
          <p>
            {" "}
            {trainerDetails.trainer_desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerDescription;
