import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";
import { useLocation } from "react-router-dom";
import Dropdown from "../../Components/dropdown";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddExercise = () => {
  const [foodCheck, setFoodCheck] = useState(true);
  const [value, setValue] = useState(null);
  const location = useLocation();
  var [excersiseOptions, setExcerciseOptions] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(location.state?.userData);
  const [calorieData, setCalorieData] = useState(
    location.state?.currentCalorie
  );
  const schema = yup.object().shape({
    time_minute: yup.string().required("Time cannot be Empty"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function postExcercise(data) {
    setModalOpen(false);
    if (!value) {
      setFoodCheck(false);
    } else {
      setFoodCheck(true);
    }
  }

  function getExcerciseData(e) {
    console.log(e);
    if (e) {
      var x = e;

      console.log(x);
      var exSet = {
        excercise_name: x,
      };
      userService.getExcercise(exSet).then((data) => {
        setExcerciseOptions(data.crud);
        console.log(excersiseOptions);
      });
    }
  }

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
  const workoutOptions = [
    { value: "benchpress", label: "Bench Press" },
    { value: "running", label: "Running" },
    { value: "swimming", label: "Swimming" },
    { value: "skipping", label: "Skipping Rope" },
  ];

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Add Exercise</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained: {calorieData.food_calories}</h4>
              <h4>Calories Burnt: </h4>
              <h4>Net Calories:</h4>

              <h4>Calorie Goal: {Math.floor(userDetails.calorie_goal)}</h4>
            </div>
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Today's Exercises</h2>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="m-3"
        >
          + Add Exercise
        </Button>
      </div>
      <div className="modal-container">
        <Modal
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              color: "white",
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              background: "rgba(0,30,60,1)",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "1rem",
              outline: "none",
              padding: "20px",
            },
          }}
          className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
          isOpen={modalOpen}
          onRequestClose={() => {
            setModalOpen(false);
          }}
        >
          <div className="modal-inner w-75 d-flex flex-column">
            <a
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <i class="bx bx-x"></i>
            </a>
            <form
              onSubmit={handleSubmit(postExcercise)}
              className="d-flex flex-column"
            >
              <div>
                <Dropdown
                  prompt="Select Excercise"
                  value={value}
                  onChange={setValue}
                  options={excersiseOptions}
                  label="excercise_name"
                  getData={getExcerciseData}
                />
              </div>

              <div className="mt-2 w-100">
                <TextField
                  id="demo-simple-select-2"
                  className="w-100"
                  label="Time"
                  variant="outlined"
                  name="time_minute"
                  {...register("time_minute")}
                  placeholder="Enter time (in minutes)"
                  InputLabelProps={{
                    style: { color: "#777" },
                  }}
                />
                <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                  {errors.time_minute?.message}
                </p>
              </div>
              <div>
                <Button type="submit" className="mt-4">Add Exercise</Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Exercise</th>
                  <th>Time (in minutes)</th>
                  <th>Calories Burnt</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cardio</td>
                  <td>Breath Control</td>
                  <td>20</td>
                  <td>300</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        className="btn btn-warning edit-btn"
                        onClick={() => {
                          setEditModalOpen(true);
                        }}
                      >
                        Edit{" "}
                      </Button>
                      <div className="modal-container">
                        <Modal
                          style={{
                            overlay: {
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,

                              backgroundColor: "rgba(0, 0, 0, 0.75)",
                            },
                            content: {
                              color: "white",
                              position: "absolute",
                              top: "40px",
                              left: "40px",
                              right: "40px",
                              bottom: "40px",
                              background: "rgba(0,30,60,1)",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "1rem",
                              outline: "none",
                              padding: "20px",
                            },
                          }}
                          className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                          isOpen={editModalOpen}
                          onRequestClose={() => {
                            setEditModalOpen(false);
                          }}
                        >
                          <div className="modal-inner w-75 d-flex flex-column">
                            <a
                              onClick={() => {
                                setEditModalOpen(false);
                              }}
                            >
                              <i class="bx bx-x"></i>
                            </a>
                            <Select
                              className="select-drop"
                              placeholder="Select Exercise"
                              options={workoutOptions}
                            />{" "}
                            <input
                              className="input-modal"
                              type="number"
                              placeholder="Enter Time (in minutes)"
                            />
                          </div>
                          <div>
                            <Button type="submit ">Add Exercise</Button>
                          </div>
                        </Modal>
                      </div>
                      <a
                        className="delete-icon"
                        onClick={() => {
                          setConfirmDelete(true);
                        }}
                      >
                        <ImCross />
                      </a>
                      <div className="modal-container">
                        <Modal
                          style={{
                            overlay: {
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,

                              backgroundColor: "rgba(0, 0, 0, 0.75)",
                            },
                            content: {
                              color: "white",
                              position: "absolute",
                              top: "40px",
                              left: "40px",
                              right: "40px",
                              bottom: "40px",
                              background: "rgba(0,30,60,1)",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "1rem",
                              outline: "none",
                              padding: "20px",
                            },
                          }}
                          className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                          isOpen={confirmDelete}
                          onRequestClose={() => {
                            setConfirmDelete(false);
                          }}
                        >
                          <div className="modal-inner w-75 d-flex flex-column">
                            <a
                              onClick={() => {
                                setConfirmDelete(false);
                              }}
                            >
                              <i class="bx bx-x"></i>
                            </a>
                            <h3>
                              Are you sure you want to delete the exercise?
                            </h3>
                            <p>Select yes to delete the item</p>
                          </div>
                          <div className="d-flex">
                            <Button className="btn-dark m-3" type="submit ">
                              Yes
                            </Button>
                            <Button className="m-3" type="submit ">
                              No
                            </Button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Cardio</td>
                  <td>Super Step</td>
                  <td>15</td>
                  <td>500</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Gym</td>
                  <td>Bench Press</td>
                  <td>30</td>
                  <td>800</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
