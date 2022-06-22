import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import trainerService from "../../services/TrainerService";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader, BarLoader, CircleLoader } from "react-spinners";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: blue;
`;

const UserProfileSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(3, "Name must be of at least 3 characters")
    .max(30, "Name must be of at most 30 characters")
    .required("Name is required"),

  weight: yup.number().positive().required().nullable(),
  feet: yup.number().typeError("feet is required").min(4).max(8).positive().required().nullable(),
  inches: yup
    .number()
    .typeError("inches are required")
    .min(0)
    .max(11)

    .required()
    .nullable(),
  activity_level: yup.string().required("Activity level can't be empty"),
  weight_goal: yup.string().required("Weight goal can't be empty"),
  weekly_goal: yup.string().required("Activity level can't be empty"),
});
function getDecimalPart(num) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split(".")[1];
  return Number(decimalStr);
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");
  const [isTrainerForm, setIsTrainerForm] = useState(false);
  const [isProfilePicForm, setIsProfilePicForm] = useState(false);
  const [isAsk, setIsAsk] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [getCustomer, setGetCustomer] = useState("");
  const [isListed, setIsListed] = useState("");
  const [trainerAge, setTrainerAge] = useState(10);
  const [selectedValue, setSelectedValue] = useState(10);
  const [inches, setInches] = useState("");
  const [loading, setLoading] = useState(false);

  const [feet, setFeet] = useState("");
  var trainersAge = "";
  var loginId = "";
  const workoutOptions = [
    { value: "weight-lifting", label: "Weight Lifting" },
    { value: "cardio", label: "Cardio" },
    { value: "stretching", label: "Stretching" },
    { value: "yoga", label: "Yoga" },
    { value: "aerobics", label: "Aerobics" },
  ];
  var userProfileDetails = {
    user_id: {
      full_name: "",
      email: "",
      password: "",
      user_type: "customer",
    },

    weight: "",
    height: "",
    activity_level: "",
    weight_goal: "",
    weekly_goal: "",
  };
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
  function calculation(customerDetails) {
    var feets = customerDetails.height / 12;
    var inch = customerDetails.height % 12;
    var height = (parseInt(feets) * 12 + parseInt(inch)) * 2.54;
    var weight = customerDetails.weight;
    var weight_pounds = weight * 2.205;
    var age = getAge(getCustomer.dob);
    var gender = getCustomer.gender;
    var goal = customerDetails.weight_goal;
    var goal_speed = customerDetails.weekly_goal;
    var bmr = 0;
    var calorie = 0;
    var protien = 0;
    var fats = 0;
    var carbs_calorie = 0;
    var carbs = 0;

    if (gender == "male") {
      bmr = 66 + 13.7 * weight + 5 * height - (6.8 - age);
    } else {
      bmr = 65.5 + 9.6 * weight + 1.8 * height - (4.7 - age);
    }
    var TDEE = customerDetails.activity_level * bmr;

    if (goal == "lose_weight") {
      if (goal_speed == 1) {
        calorie = TDEE - TDEE * 0.2;
      } else if (goal_speed == 0.5) {
        calorie = TDEE - TDEE * 0.1;
      }
      protien = weight_pounds;
      fats = weight_pounds / 2;
      carbs_calorie = calorie - (protien * 4 + fats * 9);
      carbs = carbs_calorie / 4;
    } else {
      if (goal_speed == 1) {
        calorie = TDEE + TDEE * 0.2;
      } else if (goal_speed == 0.5) {
        calorie = TDEE + TDEE * 0.1;
      }
      protien = weight_pounds;
      fats = weight_pounds / 2;
      carbs_calorie = calorie - (protien * 4 + fats * 9);
      carbs = carbs_calorie / 4;
    }

    // console.log(age)
    // console.log(protien)
    // console.log(fats)
    // console.log(carbs_calorie)
    // console.log(carbs)

    return { calorie, protien, fats, carbs };
  }
  const get_customer = () => {
    userService
      .getoneUser(loginId)
      .then((res) => {
        console.log(res);
        setGetCustomer(res.crud);
        setFeet(parseInt(res.crud.height / 12));
        setInches(res.crud.height % 12);
        if (res.crud.weight) {
          setIsProfile(true);
          //   setIsProfilePicForm(false);
          //   setIsAsk(false);
          setIsTrainerForm(false);

          setTrainerAge(getAge(res.crud.dob));
          console.log(trainerAge);
        } else {
          setIsTrainerForm(true);

          setIsProfile(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    // userService.getLoggedInUser();
    setLoggedInId(userService.getLoggedInUser()._id);
    loginId = userService.getLoggedInUser()._id;
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
    get_customer();
  }, [loginId]);

  const page_refresh = () => {
    window.location.reload(true);
  };

  const {
    register: controlUserProfile,
    handleSubmit: handleSubmitUserProfile,
    formState: { errors: errorsUserProfile },
  } = useForm({
    resolver: yupResolver(UserProfileSchema),
  });

  const submitUserProfileForm = (data) => {
    const height = data.feet * 12 + data.inches;
    // console.log("aaaaaaa");
    // setStep3(false);
    // setStep4(true);
    // setTrainerDetails({ ...trainerDetails, weekly_goal: data.weekly_goal });
    // console.log(trainerDetails);
    // console.log("aaaaaaa");
    console.log("before request");
    userProfileDetails = {
      ...userProfileDetails,
      user_id: {
        full_name: data.full_name,
        // listed: "",
        email: getCustomer.user_id.email,
        password: getCustomer.user_id.password,
      },
      weight: data.weight,
      height: height,
      activity_level: data.activity_level,
      weight_goal: data.weight_goal,
      weekly_goal: data.weekly_goal,
      // certificate_file: "",
      // trainer_photo: "",
    };

    var calorieData = calculation(userProfileDetails);

    userProfileDetails.protein = calorieData.protien;
    userProfileDetails.carbs = calorieData.carbs;
    userProfileDetails.fats = calorieData.fats;
    userProfileDetails.calorie_goal = calorieData.calorie;

    userService
      .update_user(userProfileDetails, loggedInId)
      .then((data) => {
        // console.log(data);
        setIsProfile(true);
        setIsTrainerForm(false);
        page_refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setSelectedValue(e.value);
  };
  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenu />
      {loading ? <BarLoader loading={loading} color="#063be9" css={override} size={150} /> : null}
      <h2>User Profile</h2>
      {isAsk ? (
        <div className="gym-box mt-3 d-flex flex-column justify-content-start">
          <h4>There is no profile present. Click below to create a trainer profile:</h4>
          <Button
            className="w-25 mt-4"
            onClick={() => {
              setIsTrainerForm(true);
              setIsProfilePicForm(false);
              setIsAsk(false);
            }}
          >
            Create Profile
          </Button>
        </div>
      ) : isTrainerForm ? (
        <div>
          <Button
            className="m-2"
            onClick={() => {
              setIsProfile(true);
              setIsTrainerForm(false);
            }}
          >
            <i class="bx bx-arrow-back m-1"></i> Back
          </Button>
          <div className="gym-box mt-3 d-flex flex-column align-items-left">
            <form
              onSubmit={handleSubmitUserProfile(submitUserProfileForm)}
              className="d-flex flex-column"
            >
              <div className="input-text d-flex flex-column">
                <div className="w-50 m-0">
                  <label for="lname">Enter your name</label>
                  <input
                    type="text"
                    id=""
                    defaultValue={getCustomer.user_id.full_name}
                    name="full_name"
                    {...controlUserProfile("full_name")}
                  />
                  <p>{errorsUserProfile.full_name?.message}</p>
                </div>

                <label>Enter your weight(In Kgs)</label>
                <input
                  type="number"
                  id=""
                  max="200"
                  min="30"
                  name="weight"
                  {...controlUserProfile("weight")}
                  defaultValue={getCustomer.weight}
                />
                <label htmlFor="">Height</label>
                <div className="d-flex justify-content-around ">
                  <div className="d-flex flex-column w-100">
                    <h4>feet:</h4>
                    <input
                      className="w-25"
                      defaultValue={feet}
                      type="number"
                      placeholder="Feet"
                      min="4"
                      max="8"
                      {...controlUserProfile("feet")}
                    />
                  </div>
                  <div className="d-flex flex-column w-100">
                    <h4>inches:</h4>
                    <input
                      className="w-25"
                      type="number"
                      defaultValue={inches}
                      placeholder="Inches"
                      min="0"
                      max="11"
                      // value="0"
                      {...controlUserProfile("inches")}
                    />
                    {/* <FormControl className="m-3 dropdown">
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem value="feet">feet</MenuItem>
                    <MenuItem value="cms">cms</MenuItem>
                    </Select>
                  </FormControl> */}
                  </div>
                </div>
                <div className="d-flex flex-column w-50">
                  {/* <h3 className="p-4 pb-0">Your Current height:</h3> */}
                </div>
                <p className="error">{errorsUserProfile.feet?.message}</p>
                <p className="error">{errorsUserProfile.inches?.message}</p>
                <label for="fname">Select your activity level</label>
                <div className="dropdown-container-user">
                  <FormControl className="m-3 w-50 dropdown-user" size="small">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="activity_level"
                      {...controlUserProfile("activity_level")}
                      defaultValue={getCustomer.activity_level}
                    >
                      <MenuItem value="1.2" className="d-flex flex-column">
                        <h4>Not Very Active</h4>
                        <p>Spend most of the day sitting ( e.g. bank teller, desk job) </p>
                      </MenuItem>
                      <MenuItem value="1.375" className="d-flex flex-column">
                        <h4>Lightly Active</h4>
                        <p>
                          Spend a good part of your day on your feet ( e.g. teacher, salesperson )
                        </p>
                      </MenuItem>
                      <MenuItem value="1.55" className="d-flex flex-column">
                        {" "}
                        <h4>Active</h4>
                        <p>
                          {" "}
                          Spend a good part of your day doing some physical activity ( e.g. food
                          server, postal carrier )
                        </p>
                      </MenuItem>
                      <MenuItem value="1.725" className="d-flex flex-column">
                        {" "}
                        <h4>Very Active</h4>
                        <p>
                          Spend a good part of the day doing heavy physical activity ( e.g. bike
                          messenger, carpenter )
                        </p>
                      </MenuItem>
                    </Select>
                  </FormControl>{" "}
                </div>
                <p>{errorsUserProfile.activity_level?.message}</p>
                <label for="fname">Select your weight goal</label>
                <div className="dropdown-container-user">
                  <FormControl className="m-3 w-50 dropdown-user" size="medium">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="weight_goal"
                      {...controlUserProfile("weight_goal")}
                      defaultValue={getCustomer.weight_goal}
                    >
                      <MenuItem value="gain_weight">gain weight</MenuItem>
                      <MenuItem value="lose_weight">lose weight</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </div>
                <p>{errorsUserProfile.weight_goal?.message}</p>
                <label for="fname">Select your weekly goal</label>
                <div className="dropdown-container-user">
                  <FormControl className="m-3 w-50 dropdown-user" size="medium">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="weekly_goal"
                      {...controlUserProfile("weekly_goal")}
                      defaultValue={getCustomer.weekly_goal}
                    >
                      <MenuItem value="0.5">gain / lose 0.5 pound per week</MenuItem>
                      <MenuItem value="1">gain / lose 1 pound per week</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </div>
                <p>{errorsUserProfile.weekly_goal?.message}</p>
              </div>

              <Button
                type="submit"
                className="w-25 mt-3"
                // onClick={() => {
                //   setIsProfile(true);
                // }}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      ) : isProfilePicForm ? (
        <div></div>
      ) : isProfile ? (
        <div className="trainer-desc mt-3 d-flex flex-column">
          <div className="d-flex ">
            <div className="d-flex w-75 justify-content-between">
              <div className="trainer-photo d-flex">
                {/* <img clasName="trainer-photo" src={getCustomer.trainer_photo} alt="" /> */}
                <div className="d-flex m-4 flex-column">
                  <h4>Name: {getCustomer.user_id.full_name}</h4>
                  <h4>Age: {trainerAge}</h4>
                  <h4>Gender: {getCustomer.gender}</h4>
                  <h4>Weight: {getCustomer.weight} kg</h4>
                  <h4>
                    Height: {parseInt(getCustomer.height / 12) + " ' " + (getCustomer.height % 12)}{" "}
                  </h4>
                </div>
              </div>
              <div className="trainer-btn d-flex flex-column">
                <Button
                  className="mt-5"
                  onClick={() => {
                    setIsTrainerForm(true);
                    setIsProfile(false);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="mt-5"
                  onClick={() => {
                    navigate("/change-password");
                  }}
                >
                  Change password
                </Button>
              </div>
            </div>
          </div>
          <div className="m-4 d-flex flex-column">
            <h4>
              Activity level:{" "}
              {getCustomer.activity_level == "1.2"
                ? "Not Very Active"
                : getCustomer.activity_level == "1.375"
                ? "Lightly Active"
                : getCustomer.activity_level == "1.55"
                ? "Active"
                : getCustomer.activity_level == "1.725"
                ? "Very Active"
                : null}
            </h4>
            <h4>
              Weight goal:{" "}
              {getCustomer.weight_goal == "gain_weight" ? " Gain weight" : "Lose weight  "}
            </h4>
            <h4>
              Weekly goal:{" "}
              {getCustomer.weight_goal == "gain_weight"
                ? ` Gain weight ${getCustomer.weekly_goal} pounds per week`
                : `Lose weight ${getCustomer.weekly_goal} pounds per week`}
            </h4>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfile;
