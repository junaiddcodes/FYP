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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddExercise = () => {
  const [excerciseCheck, setExcerciseCheck] = useState(true);
  const [editData, setEditData] = useState({});
  const [currentBurn, setCurrentBurn] = useState({
    excercise_calories: 0,
    excercise_proteins: 0,
    excercise_carbs: 0,
    excercise_fats: 0,
  });
  const [editExcerciselId, setEditExcerciseId] = useState("");
  const [value, setValue] = useState(null);
  const location = useLocation();
  const [excersiseOptions, setExcerciseOptions] = useState([]);
  const [excersiseData, setExcerciseData] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const navigate = useNavigate();
  var user_id = userService.getLoggedInUser()._id;
  const [userDetails, setUserDetails] = useState(location.state?.userData);
  const [calorieData, setCalorieData] = useState(location.state?.currentCalorie);
  const Edited = () => {
    // Calling toast method by passing string
    toast.success("Exercise Edited");
  };
  const Add = () => {
    // Calling toast method by passing string
    toast.success("Exercise Added");
  };
  const Delete = () => {
    // Calling toast method by passing string
    toast.success("Exercise Deleted");
  };
  const schema = yup.object().shape({
    time_minute: yup
      .number()
      .typeError("Cannot be Empty")
      .min(1, "Time Cannot be less than 1 minute")
      .max(90, "Time cannot be more than 90 minutes")
      .required("Time cannot be Empty"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function updateExcercise(data) {
    setModalOpen(false);
    if (!value) {
      setExcerciseCheck(false);
    } else {
      setExcerciseCheck(true);
      var burnedCalories = calorieBurnCalculation(data.time_minute);
      var excercisePost = {
        customer_Id: user_id,
        excercise_name: value.excercise_name,
        excercise_id: value._id,
        excercise_type: value.excercise_type,
        user_weight: userDetails.weight,
        excercise_calories: burnedCalories * data.time_minute,
        excercise_proteins: 10,
        excercise_carbs: 10,
        excercise_fats: 10,
        excercise_time: data.time_minute,
        met_value: value.met_value,
        time_date: new Date().getTime(),
      };

      userService
        .editExcerciseData(editExcerciselId, excercisePost)
        .then((e) => {
          setValue(null);
          setEditModalOpen(false);
          getExcerciseData();
          console.log("Excercise Update Successfully");
          Edited();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function getSingleExcercise(id) {
    console.log(id);
    userService
      .get_single_excercise(id)
      .then((res) => {
        setValue(res.crud);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Function to caluclate calorie Burn per minute
  function calorieBurnCalculation(time) {
    var calorieBurn = value.met_value * 3.5 * (userDetails.weight / 200);
    return calorieBurn;
  }

  function postExcercise(data) {
    if (!value) {
      setExcerciseCheck(false);
    } else {
      setModalOpen(false);
      setExcerciseCheck(true);

      var burnedCalories = calorieBurnCalculation(data.time_minute);

      var excercisePost = {
        customer_Id: user_id,
        excercise_name: value.excercise_name,
        excercise_id: value._id,
        excercise_type: value.excercise_type,
        user_weight: userDetails.weight,
        excercise_calories: burnedCalories * data.time_minute,
        excercise_proteins: 10,
        excercise_carbs: 10,
        excercise_fats: 10,
        excercise_time: data.time_minute,
        met_value: value.met_value,
        time_date: new Date().getTime(),
      };

      console.log(excercisePost);

      userService
        .postExcercise(excercisePost)
        .then((e) => {
          setValue(null);
          setModalOpen(false);
          getExcerciseData();
          console.log("Excercise Posted Successfully");
          Add();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getExcerciseAPIData(e) {
    if (e) {
      var x = e;
      var exSet = {
        excercise_name: x,
      };
      userService.getExcercise(exSet).then((data) => {
        setExcerciseOptions(data.crud);
      });
    }
  }

  function getExcerciseData() {
    if (location.state) {
      var burnCalorie = {
        excercise_calories: 0,
        excercise_proteins: 0,
        excercise_carbs: 0,
        excercise_fats: 0,
      };
      userService
        .getExcerciseData(user_id)
        .then((res) => {
          setExcerciseData(res.crud);
          res.crud.map((e) => {
            burnCalorie.excercise_calories = burnCalorie.excercise_calories + e.excercise_calories;
            burnCalorie.excercise_proteins = burnCalorie.excercise_proteins + e.excercise_proteins;
            burnCalorie.excercise_carbs = burnCalorie.excercise_carbs + e.excercise_carbs;
            burnCalorie.excercise_fats = burnCalorie.excercise_fats + e.excercise_fats;
          });
          setCurrentBurn(burnCalorie);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Empty State");
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
    getExcerciseData();
    getExcerciseAPIData("a");
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
      <Button
        className="m-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class="bx bx-arrow-back m-1"></i> Back
      </Button>
      <h2>Add Exercise</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained: {calorieData.food_calories}</h4>
              <h4>Calories Burnt: {Math.floor(currentBurn.excercise_calories)} </h4>
              <h4>
                Net Calories:
                {calorieData.food_calories - Math.floor(currentBurn.excercise_calories)}
              </h4>

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
            <form onSubmit={handleSubmit(postExcercise)} className="d-flex flex-column">
              <div>
                <Dropdown
                  prompt="Select Excercise (E.g. 'Push ups')"
                  value={value}
                  onChange={setValue}
                  options={excersiseOptions}
                  label="excercise_name"
                  getData={getExcerciseAPIData}
                />
                {!excerciseCheck ? (
                  <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                    Excercise must be Selected
                  </p>
                ) : null}
              </div>

              <div className="mt-2 w-100">
                <TextField
                  id="demo-simple-select-2"
                  className="w-100"
                  type="number"
                  step="1"
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
                <Button type="submit" className="mt-4">
                  Add Exercise
                </Button>
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
                {excersiseData.length == 0 ? (
                  <tr>
                    <td>There are no exercises for today</td>
                  </tr>
                ) : (
                  excersiseData.map((e, index) => {
                    return (
                      <tr>
                        <td>{e.excercise_type}</td>
                        <td>{e.excercise_name}</td>
                        <td>{e.excercise_time}</td>
                        <td>{Math.floor(e.excercise_calories)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Button
                              className="btn btn-warning edit-btn"
                              onClick={() => {
                                setEditModalOpen(true);
                                setEditData(e);
                                setEditExcerciseId(e._id);
                                getSingleExcercise(e.excercise_id);
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
                                  <form
                                    onSubmit={handleSubmit(updateExcercise)}
                                    className="d-flex flex-column"
                                  >
                                    <div>
                                      <Dropdown
                                        prompt="Select Excercise"
                                        value={value}
                                        onChange={setValue}
                                        options={excersiseOptions}
                                        label="excercise_name"
                                        getData={getExcerciseAPIData}
                                      />
                                      {!excerciseCheck ? (
                                        <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                                          Excercise must be selected
                                        </p>
                                      ) : null}
                                    </div>

                                    <div className="mt-2 w-100">
                                      <TextField
                                        id="demo-simple-select-2"
                                        className="w-100"
                                        label="Time"
                                        variant="outlined"
                                        name="time_minute"
                                        defaultValue={editData.excercise_time}
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
                                      <Button type="submit" className="mt-4">
                                        Edit Exercise
                                      </Button>
                                    </div>
                                  </form>
                                </div>
                              </Modal>
                            </div>
                            <a
                              className="delete-icon"
                              onClick={() => {
                                setConfirmDelete(true);
                                setDeleteId(e._id);
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
                                  <h3>Are you sure you want to delete the exercise?</h3>
                                  <p>Select yes to delete the item</p>
                                </div>
                                <div className="d-flex">
                                  <Button
                                    className="btn-dark m-3"
                                    type="submit "
                                    onClick={() => {
                                      userService.deleteExcerciseData(deleteId).then(() => {
                                        console.log("Excercise is Deleted");
                                        getExcerciseData();
                                        Delete();
                                      });

                                      setConfirmDelete(false);
                                    }}
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    className="m-3"
                                    type="submit "
                                    onClick={() => {
                                      setConfirmDelete(false);
                                    }}
                                  >
                                    No
                                  </Button>
                                </div>
                              </Modal>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
