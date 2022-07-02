import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdBookmarkAdded, MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";
import { useParams } from "react-router-dom";
import trainerService from "../../services/TrainerService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dummyImage from "../../Data/person-dummy.jpg";

const TrainerDescription = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const Add = () => {
    // Calling toast method by passing string
    toast.success("Chat Created Added");
  };
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      if (
        userService.getLoggedInUser().user_type == "trainer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
  }, []);
  const trainerId = useParams();
  const [trainerDetails, setTrainerDetails] = useState({
    user_id: { full_name: "", email: "" },
    exercise_type: "",
    gender: "",
    trainer_desc: "",
    trainer_photo: "",
    trainer_availblity: "",
  });

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

  const handlePlan = (trainerDetails) => {
    console.log(trainerDetails);
    navigate("/activity-plans", { state: { trainerDetails } });
  };
  function getTrainer() {
    trainerService.get_one_trainer(trainerId.id).then((res) => {
      setTrainerDetails(res.crud);
      console.log(res);
    });
  }
  function createConversation() {
    console.log(trainerDetails._id);
    console.log(convo);
    userService.createConvo(convo).then((data) => {
      console.log(data);
    });
    navigate("/Messenger");
  }

  var convo = {
    senderId: userService.getLoggedInUser()._id,
    receiverId: trainerDetails._id,
  };
  useEffect(getTrainer, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <Button
        className="m-2"
        style={{ borderRadius: "4rem" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class=" bx bx-chevron-left" style={{ fontSize: "1.5rem" }}></i>
      </Button>
      <h2>Trainer Description</h2>
      <div className="trainer-desc mt-3 d-flex flex-column">
        <div className="d-flex ">
          <div className="d-flex w-75 justify-content-between">
            <div className="trainer-img d-flex">
              {trainerDetails.trainer_photo ? (
                <img src={trainerDetails.trainer_photo} alt="" height="400" />
              ) : (
                <img src={dummyImage} alt="" width="400" height="400" />
              )}
              <div className="d-flex mt-5 flex-column">
                <h4>{trainerDetails.user_id.full_name}</h4>
                <h4>Age: {getAge(trainerDetails.dob)}</h4>
                <h4>Gender: {trainerDetails.gender}</h4>
                <h4>
                  Location: {trainerDetails.location?.address},{" "}
                  {trainerDetails.location?.city},{" "}
                  {trainerDetails.location?.state}
                </h4>
                <h4>
                  {!trainerDetails.numReview ? (
                    <h6 className="m-1">No reviews yet</h6>
                  ) : (
                    <h6 className="m-1">
                      Rating: {trainerDetails.numReview.toFixed(1)}{" "}
                      <span className="text-secondary">
                        ({trainerDetails.countReview})
                      </span>{" "}
                      <i class="mt-1 text-warning bx bxs-star"></i>
                    </h6>
                  )}
                </h4>
              </div>
            </div>
            <div className="trainer-btn d-flex flex-column">
              <Button
                className="mt-5"
                onClick={() => {
                  createConversation();
                  Add();
                }}
              >
                Message
              </Button>

              <Button
                className="mt-5"
                onClick={() => {
                  console.log("on click = ", trainerDetails);
                  handlePlan(trainerDetails);
                }}
              >
                View Plan
              </Button>
            </div>
          </div>
        </div>
        <div className="m-4 d-flex flex-column">
          <h4>Certification: {trainerDetails.qualification}</h4>
          <h4>Exercise Type: {trainerDetails.exercise_type}</h4>
          {/* <h4>Trainer Avaibility: {trainerDetails.trainer_availblity}</h4> */}
          <h4>About: </h4>
          <p> {trainerDetails.trainer_desc}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TrainerDescription;
