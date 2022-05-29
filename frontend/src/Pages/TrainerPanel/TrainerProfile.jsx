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
import SideMenuTrainer from "../../Components/SideMenuTrainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import trainerService from "../../services/TrainerService";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Link } from "react-router-dom";

const trainerProfileSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(3, "Name must be of at least 3 characters")
    .max(30, "Name must be of at most 30 characters")
    .required("Name is required"),
  gender: yup.string().nullable(),
  //   listed: yup.boolean(),
  exercise_type: yup.string().required("Exercise type can't be empty"),
  qualification: yup.string().required("certification can't be empty"),

  company_name: yup
    .string()
    .min(2, "Company name must be of at least 2 characters")
    .max(30, "Company name must be of at most 30 characters")
    .required("Company name can't be empty")
    .nullable(),
  designation: yup
    .string()
    .min(2, "Designation must be of at least 2 characters")
    .max(30, "Designation must be of at most 30 characters")
    .required("Designation can't be empty")
    .nullable(),

  // time_worked: yup
  //   .number()
  //   .typeError("Time is required!")
  //   .positive("Time should be a positive number")
  //   .required("Time is required!"),
  trainer_desc: yup
    .string()
    .min(200, "Trainer description must be at least 200 characters!")
    .max(500, "Trainer description must be at most 500 characters!")
    .required("Trainer description can't be empty!"),
  // certificate_file: yup.string(),
  trainer_photo: yup.string(),
});

const TrainerProfile = () => {
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
  var trainersAge = "";
  var loginId = "";
  const notify = () => {
    // Calling toast method by passing string
    toast.success("Profile send to admin");
  };
  const update = () => {
    // Calling toast method by passing string
    toast.success("Update profile");
  };
  const workoutOptions = [
    { value: "weight-lifting", label: "Weight Lifting" },
    { value: "cardio", label: "Cardio" },
    { value: "stretching", label: "Stretching" },
    { value: "yoga", label: "Yoga" },
    { value: "aerobics", label: "Aerobics" },
  ];
  var trainerProfileDetails = {
    user_id: {
      full_name: "",
      email: "",
      password: "",
      user_type: "trainer",
    },
    exercise_type: "",
    listed: "not-listed",
    company_name: "",
    designation: "",
    // time_worked: "",
    qualification: "",

    trainer_desc: "",
    certificate_file: "asdasd",
    trainer_photo: "adsadasd",
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
  const get_customer = () => {
    trainerService
      .get_one_trainer(loginId)
      .then((res) => {
        console.log(res);
        setGetCustomer(res.crud);
        if (res.crud.designation) {
          setIsProfile(true);
          setIsProfilePicForm(false);
          setIsAsk(false);
          setIsTrainerForm(false);
          console.log(getCustomer.dob);
          setTrainerAge(getAge(res.crud.dob));
          console.log(trainerAge);
          if (getCustomer.listed == true) {
            setIsListed("listed");
          } else setIsListed("not-listed");
        } else {
          setIsAsk(true);
          setIsTrainerForm(false);
          setIsProfilePicForm(false);
          setIsProfile(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // userService.getLoggedInUser();
    setLoggedInId(userService.getLoggedInUser()._id);
    loginId = userService.getLoggedInUser()._id;
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      if (
        userService.getLoggedInUser().user_type == "customer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
    get_customer();
  }, [loginId]);

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const page_refresh = () => {
    window.location.reload(true);
  };
  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("trainer", fileName);
    update();

    trainerService
      .update_trainer_photo(formData, loggedInId)
      .then((data) => {
        console.log(data);
        setIsProfilePicForm(false);
        setIsProfile(true);
        page_refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    register: controlTrainerProfile,
    handleSubmit: handleSubmitTrainerProfile,
    formState: { errors: errorsTrainerProfile },
  } = useForm({
    resolver: yupResolver(trainerProfileSchema),
  });

  const submitTrainerProfileForm = (data) => {
    // console.log("aaaaaaa");
    // setStep3(false);
    // setStep4(true);
    // setTrainerDetails({ ...trainerDetails, weekly_goal: data.weekly_goal });
    // console.log(trainerDetails);
    // console.log("aaaaaaa");
    console.log("before request");
    trainerProfileDetails = {
      ...trainerProfileDetails,
      user_id: {
        full_name: data.full_name,
        email: getCustomer.user_id.email,
        password: getCustomer.user_id.password,
        user_type: "trainer",
      },
      exercise_type: data.exercise_type,
      // listed: "",
      company_name: data.company_name,
      designation: data.designation,
      // time_worked: data.time_worked,
      qualification: data.qualification,
      trainer_desc: data.trainer_desc,
      trainer_photo: getCustomer.trainer_photo,
      // certificate_file: "",
      // trainer_photo: "",
    };
    notify();
    trainerService
      .update_trainer(trainerProfileDetails, loggedInId)
      .then((data) => {
        // console.log(data);
        setIsTrainerForm(false);
        setIsProfile(true);
        page_refresh();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(trainerProfileDetails);
    console.log("after request");
    // setIsProfilePicForm(true);
  };
  const handleChange = (e) => {
    setSelectedValue(e.value);
  };
  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuTrainer />
      <h2>Trainer Profile</h2>
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
              page_refresh();
            }}
          >
            <i class="bx bx-arrow-back m-1"></i> Back
          </Button>
          <div className="gym-box mt-3 d-flex flex-column align-items-left">
            <form
              onSubmit={handleSubmitTrainerProfile(submitTrainerProfileForm)}
              className="d-flex flex-column"
            >
              <div className="input-text d-flex flex-column">
                <div className="w-50 m-0">
                  <label>Your Name</label>
                  <input
                    type="text"
                    id=""
                    name="full_name"
                    {...controlTrainerProfile("full_name")}
                    defaultValue={getCustomer.user_id.full_name}
                  />

                  <p>{errorsTrainerProfile.full_name?.message}</p>
                  <label for="fname">Select your exercise type</label>
                  <FormControl className="m-3 w-100 dropdown-trainer">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="exercise_type"
                      {...controlTrainerProfile("exercise_type")}
                      defaultValue={getCustomer.exercise_type}
                    >
                      <MenuItem value="cardio">Cardio</MenuItem>
                      <MenuItem value="gym">Gym</MenuItem>
                      <MenuItem value="stretching">Stretching</MenuItem>
                      <MenuItem value="boxing">boxing</MenuItem>
                      <MenuItem value="aerobics">Aerobics</MenuItem>
                      <MenuItem value="kickboxing">Kickboxing</MenuItem>
                      <MenuItem value="swimming">Swimming</MenuItem>
                    </Select>
                  </FormControl>

                  {/* <Select
                  className="select-drop"
                  placeholder="Select Exercise Type"
                  options={workoutOptions}
                  value={workoutOptions.find((obj) => obj.value === selectedValue)}
                  // value={e.options.value}
                  onChange={handleChange}
                  name="exercise_type"
                  {...controlTrainerProfile("exercise_type")}
                /> */}
                  <p>{errorsTrainerProfile.exercise_type?.message}</p>
                  <label for="fname">Enter Your certification</label>
                  <FormControl className="m-3 w-100 dropdown-trainer">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="qualification"
                      {...controlTrainerProfile("qualification")}
                      defaultValue={getCustomer.qualification}
                    >
                      <MenuItem value="Master Fitness Instructor Course (MFIC)">
                        Master Fitness Instructor Course (MFIC)
                      </MenuItem>
                      <MenuItem value="                        Unarmed Combat & Bayonet Fighting Course (UCBC)">
                        Unarmed Combat & Bayonet Fighting Course (UCBC)
                      </MenuItem>
                      <MenuItem value="                        Advance Unarmed Combat & Bayonet Fighting Course (Adv UCBC)">
                        Advance Unarmed Combat & Bayonet Fighting Course (Adv UCBC)
                      </MenuItem>
                      <MenuItem value="                        Sports Coaching Courses army school of training">
                        Sports Coaching Courses army school of training
                      </MenuItem>
                      <MenuItem value="Water Sports Course (WSC)">
                        Water Sports Course (WSC)
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <p>{errorsTrainerProfile.qualification?.message}</p>
                </div>

                <label>Enter the company you are currently working at</label>
                <input
                  type="text"
                  id=""
                  name="company_name"
                  {...controlTrainerProfile("company_name")}
                  defaultValue={getCustomer.company_name}
                />

                <p>{errorsTrainerProfile.company_name?.message}</p>
                <label for="lname">Enter your designation in the current company </label>
                <input
                  type="text"
                  id=""
                  name="designation"
                  {...controlTrainerProfile("designation")}
                  defaultValue={getCustomer.designation}
                />
                <p>{errorsTrainerProfile.designation?.message}</p>
                {/* <label for="lname">
                  Enter the time you are available at daily basis ( 0-12 hrs )
                </label>
                <input
                  type="number"
                  id=""
                  name="time_worked"
                  {...controlTrainerProfile("time_worked")}
                  defaultValue={getCustomer.time_worked}
                />
                <p>{errorsTrainerProfile.time_worked?.message}</p> */}
                {/* <label for="lname">Your gender</label> */}
              </div>

              <label for="lname">Your details</label>

              <textarea
                className="text-field mt-2"
                name="trainer_desc"
                {...controlTrainerProfile("trainer_desc")}
                defaultValue={getCustomer.trainer_desc}
              />
              <p>{errorsTrainerProfile.trainer_desc?.message}</p>

              {/* <label for="lname">Upload certificate file</label>
            <p className="general-p">Please upload your profile picture</p>
          <input type="file" /> */}
              <p className="general-p mt-5">
                Submit Profile to the Admin. Admin will review your profile and Approve it:
              </p>
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
            <p>{trainerProfileDetails.exercise_type}</p>
          </div>
        </div>
      ) : isProfilePicForm ? (
        <div>
          <Button
            className="m-2"
            onClick={() => {
              setIsProfile(true);
              setIsProfilePicForm(false);
            }}
          >
            <i class="bx bx-arrow-back m-1"></i> Back
          </Button>
          <p className="general-p">Please upload your profile picture</p>
          <div className="upload-photo-card">
            <TransformWrapper>
              <TransformComponent>
                <img className="preview" src={previewImage} alt="" />
              </TransformComponent>
            </TransformWrapper>
          </div>
          <form onSubmit={changeOnClick} encType="multipart/form-data">
            <div className="upload-form">
              <input
                style={{ marginTop: "1rem" }}
                accept="image/*"
                type="file"
                filename="trainer"
                onChange={onChangeFile}
              />
              <button
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                className="btn btn-primary w-25"
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      ) : isProfile ? (
        <div className="trainer-desc mt-3 d-flex flex-column">
          <div className="d-flex ">
            <div className="d-flex w-75 justify-content-between">
              <div className="trainer-photo d-flex">
                <img clasName="trainer-photo" src={getCustomer.trainer_photo} alt="" />
                <div className="d-flex mt-5 flex-column">
                  <h4>Name: {getCustomer.user_id.full_name}</h4>
                  <h4>Age: {trainerAge}</h4>
                  <h4>Gender: {getCustomer.gender}</h4>
                  <h4>Status: {isListed}</h4>
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
                    setIsProfilePicForm(true);
                    setIsProfile(false);
                    setIsTrainerForm(false);
                  }}
                >
                  Edit profile picture
                </Button>
                <Button
                  className="mt-5"
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                >
                  Delete
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
                      <h3>Are you sure you want to delete the profile?</h3>
                      <p>Select yes to delete the profile</p>
                    </div>
                    <div className="d-flex">
                      <Button
                        className="btn-dark m-3"
                        type="submit "
                        onClick={() => {
                          trainerProfileDetails = {
                            ...trainerProfileDetails,
                            exercise_type: "",
                            listed: false,
                            company_name: "",
                            designation: "",
                            time_worked: "",
                            trainer_desc: "",
                            certificate_file: "",
                            trainer_photo: "",
                          };
                          notify();
                          trainerService
                            .update_trainer(trainerProfileDetails, loggedInId)
                            .then((data) => {
                              console.log(data);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          console.log(trainerProfileDetails + "deleted");
                          setIsAsk(true);
                          setIsProfile(false);
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        className="m-3"
                        type="submit"
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
            </div>
          </div>
          <div className="m-4 d-flex flex-column">
            <h4>Certification: {getCustomer.qualification}</h4>
            <h4>Exercise Type: {getCustomer.exercise_type}</h4>
            <h4>Company Name: {getCustomer.company_name}</h4>
            <h4>Designation: {getCustomer.designation}</h4>
            <h4>About: </h4>
            <p> {getCustomer.trainer_desc}</p>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default TrainerProfile;
