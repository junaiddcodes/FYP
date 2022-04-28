import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
import SideMenuGym from "../../Components/SideMenuGym";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import gymService from "../../services/GymService";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Link } from "react-router-dom";

const gymProfileSchema = yup.object().shape({
  state: yup.string().required(),
  city: yup.string().required(),
  adress: yup.string().required(),
  gym_desc: yup
    .string()
    .min(200, "Description must be at least 200 characters!")
    .required("Gym description can't be empty"),
  gym_contact_no: yup.string().min(11, "Contact number must be at least 11 digits!").required(),
  gym_membership_price: yup
    .number()
    .typeError("Membership price is required!")
    .positive("Membership price should be a positive number")
    .required("Gym membership price is required!"),

  gender_facilitation: yup.string().required("An option is required").nullable(),
  gym_photo: yup.string(),
});

const GymProfile = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [isAsk, setIsAsk] = useState(false);
  const [getGym, setGetGym] = useState("");
  const [isGymForm, setIsGymForm] = useState(false);
  const [isGymPicForm, setIsGymPicForm] = useState(false);
  const [isListed, setIsListed] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");
  var loginId = "";

  var gymProfileDetails = {
    location: { state: "", city: "", adress: "" },
    gym_desc: "",
    gym_contact_no: "",
    gym_membership_price: "",
    gender_facilitation: "",
    gym_photo: "photo",
  };

  const get_gym = () => {
    gymService
      .get_one_gym(loginId)
      .then((res) => {
        console.log(res);
        setGetGym(res.crud);
        if (res.crud.gym_membership_price) {
          setIsProfile(true);
          setIsGymPicForm(false);
          setIsAsk(false);
          setIsGymForm(false);
          if (getGym.listed == true) {
            setIsListed("listed");
          } else setIsListed("not-listed");
        } else {
          setIsAsk(true);
          setIsGymForm(false);
          setIsGymPicForm(false);
          setIsProfile(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoggedInId(userService.getLoggedInUser()._id);
    loginId = userService.getLoggedInUser()._id;
    if (userService.isLoggedIn() == false) {
      navigate("/login");
      // console.log("log in first");
    }
    get_gym();
  }, [loginId]);

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("frontImage", fileName);

    axios
      .post("/frontend/public/uploads", formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    setIsProfile(true);
    page_refresh();
  };
  const {
    register: controlGymProfile,
    handleSubmit: handleSubmitGymProfile,
    formState: { errors: errorsGymProfile },
  } = useForm({
    resolver: yupResolver(gymProfileSchema),
  });

  const page_refresh = () => {
    window.location.reload(true);
  };

  const submitGymProfileForm = (data) => {
    // console.log("aaaaaaa");
    // setStep3(false);
    // setStep4(true);
    // setTrainerDetails({ ...trainerDetails, weekly_goal: data.weekly_goal });
    // console.log(trainerDetails);
    // console.log("aaaaaaa");
    console.log("before request");
    gymProfileDetails = {
      ...gymProfileDetails,
      location: { ...gymProfileDetails, state: data.state, city: data.city, adress: data.adress },
      gym_desc: data.gym_desc,
      gym_contact_no: data.gym_contact_no,
      gym_membership_price: data.gym_membership_price,
      gender_facilitation: data.gender_facilitation,
      gym_photo: data.gym_photo,
    };
    gymService
      .update_gym(gymProfileDetails, loggedInId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(gymProfileDetails);
    console.log("after request");
    setIsAsk(false);
    setIsGymForm(false);
    setIsGymPicForm(true);
  };

  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuGym />

      <h2>Gym Profile</h2>
      {isAsk ? (
        <div className="gym-box mt-3 d-flex flex-column justify-content-start">
          <h4>There is no profile present. Click below to create a gym profile:</h4>
          <Button
            className="w-25 mt-4"
            onClick={() => {
              setIsGymForm(true);
              setIsAsk(false);
              // get_gym_info();
            }}
          >
            Create Profile
          </Button>
        </div>
      ) : isGymForm ? (
        <div className="gym-box mt-3 d-flex flex-column align-items-left">
          <form
            onSubmit={handleSubmitGymProfile(submitGymProfileForm)}
            className="d-flex flex-column"
          >
            <div className="input-text d-flex flex-column">
              {/* <p>{gymProfileDetails.user_id.full_name}</p> */}
              {/* <p>{gymProfileDetails.location}</p> */}
              {/* <p>{loggedInId}</p> */}
              <label for="">Gym Location</label>
              <label for="">State</label>
              <input type="text" name="state" {...controlGymProfile("state")} />
              <label for="">City</label>
              <input type="text" name="city" {...controlGymProfile("city")} />
              <label for="">Adress</label>
              <input type="text" name="adress" {...controlGymProfile("adress")} />
              <p>{errorsGymProfile.location?.message}</p>
              <label for="">Gym Contact Number</label>
              <input type="text" name="gym_contact_no" {...controlGymProfile("gym_contact_no")} />
              <p>{errorsGymProfile.gym_contact_no?.message}</p>
              <label for="">Gym Membership Price</label>
              <input
                type="Number"
                name="gym_membership_price"
                {...controlGymProfile("gym_membership_price")}
              />
              <p>{errorsGymProfile.gym_membership_price?.message}</p>
              <label for="">Gender Facilitation</label>
            </div>
            <div className="d-flex mt-2 gender-radio justify-content-start">
              <input
                type="radio"
                value="Male"
                name="gender_facilitaion"
                {...controlGymProfile("gender_facilitation")}
              />
              <h4>Male</h4>
              <input
                type="radio"
                value="Female"
                name="gender_facilitaion"
                {...controlGymProfile("gender_facilitation")}
              />
              <h4>Female</h4>
              <input
                type="radio"
                value="Both"
                name="gender_facilitaion"
                {...controlGymProfile("gender_facilitation")}
              />
              <h4>Both</h4>
            </div>
            <p>{errorsGymProfile.gender_facilitation?.message}</p>

            <label for="">Gym Description</label>

            <textarea
              className="text-field mt-2"
              name="gym_desc"
              {...controlGymProfile("gym_desc")}
            />
            <p>{errorsGymProfile.gym_desc?.message}</p>

            {/* <div className="upload-photo-card">
                <TransformWrapper>
                  <TransformComponent>
                    <img className="preview-gym" src={previewImage} alt="" />
                  </TransformComponent>
                </TransformWrapper>
              </div> */}
            {/* <form onSubmit={changeOnClick} encType="multipart/form-data">
                <div className="upload-form">
                  <input
                    style={{ marginTop: "1rem" }}
                    type="file"
                    filename="frontImage"
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
              </form> */}

            <p className="mt-3 general-p">
              Submit Profile to the Admin. Admin will review your profile and Approve it:
            </p>
            <Button type="submit" className="w-25">
              Submit
            </Button>
          </form>
        </div>
      ) : isGymPicForm ? (
        <div>
          <p className="general-p">Please upload your gym's pictures</p>
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
                filename="frontImage"
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
              <div className="trainer-img d-flex">
                <div className="m-4 d-flex mt-5 flex-column">
                  <h4>Gym Name: {getGym.user_id.full_name}</h4>
                  <h4>Location: {getGym.location}</h4>
                  <h4>Gender: {getGym.gender_facilitation}</h4>
                </div>
              </div>
              <div className="trainer-btn d-flex flex-column">
                <Button
                  className="mt-5"
                  onClick={() => {
                    setIsGymForm(true);
                    setIsProfile(false);
                    setIsAsk(false);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="mt-5"
                  onClick={() => {
                    gymProfileDetails = {
                      ...gymProfileDetails,
                      location: "",
                      gym_desc: "",
                      gym_contact_no: "",
                      gym_membership_price: "",
                      gender_facilitation: "",
                      gym_photo: "",
                    };
                    gymService
                      .update_gym(gymProfileDetails, loggedInId)
                      .then((data) => {
                        console.log(data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    console.log(gymProfileDetails + "deleted");
                    setIsAsk(true);
                    setIsProfile(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="slider-div d-flex justify-content-center p-5">
            <Carousel width="70%">
              <div>
                <img src="../../../images/trainer.png" />
              </div>
              <div>
                <img src="../../../images/trainer.png" />
              </div>
              <div>
                <img src="../../../images/trainer.png" />
              </div>
            </Carousel>
          </div>
          <div className="m-4 d-flex flex-column">
            <h4>Gym Contact Number: {getGym.gym_contact_no}</h4>
            <h4>Gym Membership Price: {getGym.gym_membership_price}</h4>
            <h4>About Gym: </h4>
            <p> {getGym.gym_desc}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GymProfile;
