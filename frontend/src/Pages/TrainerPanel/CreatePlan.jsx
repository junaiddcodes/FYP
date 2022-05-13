import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenuTrainer from "../../Components/SideMenuTrainer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";

const CreatePlan = () => {
  const [isStep1, setIsStep1] = useState(true);
  const navigate = useNavigate();

  const [isStep2, setIsStep2] = useState(false);
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      // console.log("log in first");
    }
    if (
      userService.getLoggedInUser().user_type == "customer" ||
      userService.getLoggedInUser().user_type == "gym" ||
      userService.getLoggedInUser().user_type == "admin"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuTrainer />
      <h2>Create Activity Plan</h2>
      {isStep1 ? (
        <div className="gym-box mt-3 d-flex flex-column align-items-left">
          <form className="d-flex flex-column">
            <div className="input-text d-flex flex-column">
              <label for="lname">Enter plan title</label>
              <input type="text" id="" name="" value="" />
              <label for="lname">Enter plan duration in weeks</label>
              <input type="number" id="" name="" value="" placeholder="E.g. 4" />
              <label for="lname">Enter plan price in PKR</label>
              <input type="number" id="" name="" value="" placeholder="E.g. 3000" />
            </div>

            <label for="lname">Describe your plan</label>

            <textarea className="text-field mt-2" placeholder="Plan description" />
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                className="mt-4 w-25"
                onClick={() => {
                  setIsStep2(true);
                  setIsStep1(false);
                }}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      ) : isStep2 ? (
        <div className="gym-box mt-3 d-flex flex-column align-items-left">
          <form className="d-flex flex-column">
            <div className="input-text d-flex flex-column">
              <label for="lname">Select week</label>
              <FormControl className="mt-3 w-50 dropdown-trainer">
                <InputLabel id="demo-simple-select-label">Select Exercise Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select">
                  <MenuItem value="lbs">Week 1</MenuItem>
                  <MenuItem value="kgs">Week 2</MenuItem>
                  <MenuItem value="kgs">Week 3</MenuItem>
                  <MenuItem value="kgs">Week 4</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="mt-3 w-50 dropdown-trainer">
                <InputLabel id="demo-simple-select-label">Select day</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select">
                  <MenuItem value="lbs">Monday</MenuItem>
                  <MenuItem value="kgs">Tuesday</MenuItem>
                  <MenuItem value="kgs">Wednesday</MenuItem>
                  <MenuItem value="kgs">Thursday</MenuItem>
                  <MenuItem value="kgs">Friday</MenuItem>
                  <MenuItem value="kgs">Saturday</MenuItem>
                  <MenuItem value="kgs">Sunday</MenuItem>
                </Select>
              </FormControl>
              <label for="lname">Enter Activities</label>
              <textarea className="text-field-trainer mt-2" placeholder="Activity 1 Detail" />
              <textarea className="text-field-trainer mt-2" placeholder="Activity 2 Detail" />
              <div className=" w-50 mt-4 d-flex justify-content-center align-items-center">
                <AiOutlinePlusCircle className="add-icon" />
              </div>
              <p className="mt-3">
                Note: Please Enter all activities fo all Days that you selected.
              </p>
            </div>

            <div className="d-flex justify-content-between ">
              <Button
                type="submit"
                className="mt-4 w-25"
                onClick={() => {
                  setIsStep2(false);
                  setIsStep1(true);
                }}
              >
                Back
              </Button>
              <Link className=" w-50" to="/trainer-activity-plans">
                <Button type="submit" className="mt-4 w-25">
                  Submit
                </Button>
              </Link>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CreatePlan;
