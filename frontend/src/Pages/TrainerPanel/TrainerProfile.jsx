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

const TrainerProfile = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [isTrainerForm, setIsTrainerForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuTrainer />
      <h2>Gym Profile</h2>
      {!isProfile ? (
        !isTrainerForm ? (
          <div className="gym-box mt-3 d-flex flex-column justify-content-start">
            <h4>There is no profile present. Click below to create a trainer profile:</h4>
            <Button
              className="w-25 mt-4"
              onClick={() => {
                setIsTrainerForm(true);
              }}
            >
              Create Profile
            </Button>
          </div>
        ) : (
          <div className="gym-box mt-3 d-flex flex-column align-items-left">
            <form className="d-flex flex-column">
              <div className="input-text d-flex flex-column">
                <div className="w-50 m-0">
                  <label for="fname">Select your exercise type</label>
                  <FormControl className="m-3 w-100 dropdown-trainer">
                    <InputLabel id="demo-simple-select-label">Select Exercise Type</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select">
                      <MenuItem value="lbs">Cardio</MenuItem>
                      <MenuItem value="kgs">Gym</MenuItem>
                      <MenuItem value="kgs">Stretching</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <label for="lname">Enter you graduation</label>
                <input type="text" id="" name="" value="" />
                <label for="lname">Enter your qualification</label>
                <input type="text" id="" name="" value="" />
                <label for="lname">Your gender</label>
              </div>
              <div className="d-flex mt-2 gender-radio justify-content-start">
                <input type="radio" value="Male" />
                <h4>Male</h4>
                <input type="radio" value="Female" />
                <h4>Female</h4>
                <input type="radio" value="Both" />
                <h4>Both</h4>
              </div>

              <label for="lname">Your details</label>

              <textarea className="text-field mt-2" />

              <label for="lname">Upload profile picture</label>
              <p>Please upload your profile picture</p>
              <input type="file" />
              <p className="mt-3">
                Submit Profile to the Admin. Admin will review your profile and Approve it:
              </p>
              <Button
                type="submit"
                className="w-25"
                onClick={() => {
                  setIsProfile(true);
                }}
              >
                Submit
              </Button>
            </form>
          </div>
        )
      ) : (
        <div className="trainer-desc mt-3 d-flex flex-column">
          <div className="d-flex ">
            <div className="d-flex w-75 justify-content-between">
              <div className="trainer-img d-flex">
                <img src="../../../images/trainer.png" alt="" />
                <div className="d-flex mt-5 flex-column">
                  <h4>Hamza Kasim</h4>
                  <h4>Age:</h4>
                  <h4>Gender:</h4>
                  <h4>Status:</h4>
                </div>
              </div>
              <div className="trainer-btn d-flex flex-column">
                <Button className="mt-5">Edit</Button>
                <Button className="mt-5">Delete</Button>
              </div>
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
      )}
    </div>
  );
};

export default TrainerProfile;
