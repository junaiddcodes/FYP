import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";

import useGeoLocation from "../custom-hooks/useGeoLocation";
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
import { ClimbingBoxLoader, BarLoader, CircleLoader } from "react-spinners";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import StripeContainer from "../../Components/Stripe/StripeContainer";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: blue;
`;
const gymProfileSchema = yup.object().shape({
  // full_name: yup
  //   .string()
  //   .min(3, "Name must be of at least 3 characters")
  //   .max(30, "Name must be of at most 30 characters")
  //   .required("Name is required"),
  state: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
  gym_desc: yup
    .string()
    .min(200, "Description must be at least 200 characters!")
    .required("Gym description can't be empty"),
  gym_contact_no: yup
    .string()
    .min(11, "Contact number must be at least 11 digits!")
    .max(11, "Contact number must be at Most 11 digits!")
    .required(),
  gym_membership_price: yup
    .number()
    .typeError("Membership price is required!")
    .positive("Membership price should be a positive number")
    .max(50000, "Price should not be more than Rs 50,000")
    .min(1000, "Price should not be less than Rs 1,000")
    .required("Gym membership price is required!"),
  // latitude: yup.number().typeError("Latitude is required!").required("Latitude is required!"),
  // longitude: yup
  //   .number()
  //   .typeError("Longitude is required!")
  //   .positive()

  //   .max(78, "Longitude can not be more than 78")
  //   .min(60, "Longitude can not be less than 60")
  //   .required("Longitude is required!"),

  gender_facilitation: yup.string().required("Gender facilitation can't be empty"),
  gym_photo: yup.string(),
});

const GymProfile = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBdLc31kclLs_2r72Uh0G88vBfYConu4BU",
  });
  const navigate = useNavigate();
  const [fileName1, setFileName] = React.useState([]);
  const [previewImage, setPreviewImage] = React.useState([]);
  const [mapError, setMapError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isAsk, setIsAsk] = useState(false);
  // const [male, setMale] = useState(false);
  // const [female, setFemale] = useState(false);
  // const [both, setBoth] = useState(false);
  const [getGym, setGetGym] = useState("");
  const [isGymForm, setIsGymForm] = useState(false);
  const [gymPhotos, setGymPhotos] = useState([]);
  const [isGymPicForm, setIsGymPicForm] = useState(false);
  const [isListed, setIsListed] = useState("default");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");
  const [file, setFile] = useState(null);
  const [errorPic, setPicError] = useState(false);
  const [boughtPlans, setBoughtPlans] = useState([]);
  const location = useGeoLocation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [confirmDeleteX, setConfirmDeleteX] = useState(false);

  var loginId = "";

  var gymProfileDetails = {
    user_id: {
      user_type: "trainer",
    },
    location: { state: "", city: "", address: "" },
    coordinates: { lat: "", long: "" },
    gym_desc: "",
    gym_contact_no: "",
    gym_membership_price: "",
    gender_facilitation: "",
    gym_photo: "photo",
    listed: "not-listed",
  };

  function handleBuyMembership() {
    var mem = { membership: true };
    gymService.update_gym(mem, loggedInId).then((data) => {
      console.log(data);
      //get_gym();
      setIsListed("approved")
      setConfirmDeleteX(false)
    });
  }

  const get_gym = () => {
    gymService
      .get_one_gym(loginId)
      .then((res) => {
        console.log(res);
        setGetGym(res.crud);
        if (res.crud.gym_photos) {
          setGymPhotos(res.crud.gym_photos);
        }

        if (res.crud.gym_membership_price) {
          setIsProfile(true);
          setIsGymPicForm(false);
          setIsAsk(false);
          setIsGymForm(false);
          if (res.crud.listed == "listed") {
            setIsListed("listed");
          } else if (res.crud.listed == "rejected") {
            setIsListed("rejected");
          } else setIsListed("not-listed");

          if (res.crud.membership && res.crud.listed == "listed") {
            setIsListed("default");
          }
        } else {
          setIsAsk(true);
          setIsGymForm(false);
          setIsGymPicForm(false);
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
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      setLoggedInId(userService.getLoggedInUser()._id);
      loginId = userService.getLoggedInUser()._id;
      if (
        userService.getLoggedInUser().user_type == "customer" ||
        userService.getLoggedInUser().user_type == "trainer" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
    get_gym();
    // if (getGym.gender_facilitation == "male") {
    //   setMale(true);
    // }
    // if (getGym.gender_facilitation == "female") {
    //   setFemale(true);
    // }
    // if (getGym.gender_facilitation == "both") {
    //   setBoth(true);
    // }
  }, [loginId]);

  const changeOnClick = (e) => {
    e.preventDefault();
    console.log("aaaaa");
    console.log(file);
    const formData = new FormData();
    let newArr = [];
    for (let i = 0; i < file.length; i++) {
      formData.append("gym", file[i]);
    }
    // formData.append("gym", newArr);
    console.log(formData.get("gym"));

    // formData.append("gym", fileName1);
    // formData.append("gym", fileName2);
    // formData.append("gym", fileName3);
    // console.log("bbbbb");
    // console.log(formData);
    gymService
      .update_gym_photo(formData, loggedInId)
      .then((data) => {
        setPicError(false);
        console.log(data);
        setIsGymPicForm(false);
        setIsProfile(true);
        page_refresh();
      })
      .catch((err) => {
        if (err.response.status == 500) {
          setPicError(true);
        }
      });
    // setIsProfile(true);
    // page_refresh();
    console.log("ccccc");
  };
  const {
    register: controlGymProfile,
    handleSubmit: handleSubmitGymProfile,
    formState: { errors: errorsGymProfile },
  } = useForm({
    resolver: yupResolver(gymProfileSchema),
  });
  const submitGymProfileForm = (data) => {
    console.log("hello");
    // setStep3(false);
    // setStep4(true);
    // setTrainerDetails({ ...trainerDetails, weekly_goal: data.weekly_goal });
    // console.log(trainerDetails);
    // console.log("aaaaaaa");
    console.log("before request");
    gymProfileDetails = {
      ...gymProfileDetails,

      user_id: {
        full_name: getGym.user_id.full_name,
        email: getGym.user_id.email,
        password: getGym.user_id.password,
        user_type: "gym",
      },
      location: {
        ...gymProfileDetails,
        state: data.state,
        city: data.city,
        address: data.address,
      },
      coordinates: {
        lat: latitude,
        long: longitude,
      },
      gym_desc: data.gym_desc,
      gym_contact_no: data.gym_contact_no,
      gym_membership_price: data.gym_membership_price,
      gender_facilitation: data.gender_facilitation,
      gym_photos: getGym.gym_photos,
    };

    gymService
      .update_gym(gymProfileDetails, loggedInId)
      .then((data) => {
        console.log(data);
        setIsAsk(false);
        setIsGymForm(false);
        page_refresh();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(gymProfileDetails);
    console.log("after request");
  };

  const page_refresh = () => {
    window.location.reload(true);
  };

  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuGym />
      {loading ? <BarLoader loading={loading} color="#063be9" css={override} size={150} /> : null}

      <h2>Gym Profile</h2>
      {isListed == "default" ? null : isListed == "not-listed" ? (
        <div className="gym-box mt-3 d-flex flex-column justify-content-start">
          <h4>Your profile is being reviewed by admin</h4>
        </div>
      ) : isListed == "rejected" ? (
        <div className="gym-box mt-3 d-flex flex-column justify-content-start">
          <h4>Your profile was rejected by admin</h4>
        </div>
      ): isListed == "approved" ? (
        <div className="gym-box mt-3 d-flex flex-column justify-content-start">
          <h4>Payment Confirmed. Rock and Roll you are now available for our users</h4>
        </div>
      ) : isListed == "listed" ? (
        <div className="gym-box mt-3 d-flex flex-column justify-content-start">
          <h4>
            You have been approved by admin. To list the gym you need to pay one time fee of Rs
            1000.
          </h4>
          <div>
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
                className="modal-x w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                isOpen={confirmDeleteX}
                onRequestClose={() => {
                  setConfirmDeleteX(false);
                }}
              >
                <div className="modal-inner w-75 d-flex flex-column">
                  <a
                    onClick={() => {
                      setConfirmDeleteX(false);
                    }}
                  >
                    <i class="bx bx-x"></i>
                  </a>
                  <StripeContainer
                    amount={1000}
                    action={handleBuyMembership}
                    description="Gym Listing Fees"
                  />
                </div>
              </Modal>
            </div>
            <Button className="w-50 m-3" onClick={() => setConfirmDeleteX(true)}>
              Get Listed
            </Button>
          </div>
        </div>
      ) : null}
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
        <div>
          <Button
            onClick={() => {
              page_refresh();
            }}
          >
            back
          </Button>
          <label className="m-3 mb-1">Choose gym location on map</label>
          <GoogleMap
            zoom={12}
            // styles={{ width: "70%", height: "40%" }}
            onClick={(e) => {
              setLatitude(e.latLng.lat());
              setLongitude(e.latLng.lng());
              let lati = e.latLng.lat();
              let lngi = e.latLng.lng();
              console.log(lati, lngi);
            }}
            center={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
            mapContainerClassName="map-container-gym"
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
          <div className="gym-box mt-3 d-flex flex-column align-items-left">
            <form
              onSubmit={handleSubmitGymProfile(submitGymProfileForm)}
              className="d-flex flex-column"
            >
              <div className="input-text d-flex flex-column">
                {/* {mapError ? <p>{mapError}</p> : null} */}
                {/* <p>{gymProfileDetails.user_id.full_name}</p> */}
                {/* <p>{gymProfileDetails.location}</p> */}
                {/* <p>{loggedInId}</p> */}
                {/* <label>Or enter manually</label>
                <label>Latitude</label>
                <input
                  type="number"
                  id=""
                  name="latitude"
                  {...controlGymProfile("latitude")}
                  defaultValue={latitude}
                  // onChange={(e) => {
                  //   setLatitude(e.target.value);
                  // }}
                />
                <p>{errorsGymProfile.latitude?.message}</p>
                <label>Longitude</label>
                <input
                  type="number"
                  id=""
                  name="longitude"
                  {...controlGymProfile("longitude")}
                  value={longitude}
                  // onChange={(e) => {
                  //   setLongitude(e.target.value);
                  // }}
                />
                <p>{errorsGymProfile.longitude?.message}</p> */}

                <label for="" className="m-3 mb-1">
                  Gym Location
                </label>
                <label for="" className="m-3 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  className="m-3 mt-0"
                  defaultValue={getGym.location?.state}
                  {...controlGymProfile("state")}
                />

                <p>{errorsGymProfile.state?.message}</p>
                <label className="m-3 mb-1" for="">
                  City
                </label>

                <input
                  type="text"
                  className="m-3 mt-0"
                  name="city"
                  defaultValue={getGym.location?.city}
                  {...controlGymProfile("city")}
                />

                <p>{errorsGymProfile.city?.message}</p>
                <label for="" className="m-3 mb-1">
                  Address
                </label>

                <input
                  className="m-3 mb-1"
                  type="text"
                  name="address"
                  className="m-3 mt-0"
                  defaultValue={getGym.location?.address}
                  {...controlGymProfile("address")}
                />
                <p>{errorsGymProfile.address?.message}</p>
                {/* 
                <label>Gym Name</label>
                <input
                  type="text"
                  id=""
                  name="full_name"
                  {...controlGymProfile("full_name")}
                  defaultValue={getGym.user_id.full_name}
                />
                <p>{errorsGymProfile.full_name?.message}</p> */}
                <label for="" className="m-3 mb-1">
                  Gym Contact Number
                </label>
                <input
                  type="text"
                  className="m-3 mt-0"
                  name="gym_contact_no"
                  defaultValue={getGym.gym_contact_no}
                  {...controlGymProfile("gym_contact_no")}
                />
                <p>{errorsGymProfile.gym_contact_no?.message}</p>
                <label for="" className="m-3 mb-1">
                  Gym Membership Price (in Rs)
                </label>
                <input
                  type="Number"
                  className="m-3 mt-0"
                  name="gym_membership_price"
                  defaultValue={getGym.gym_membership_price}
                  {...controlGymProfile("gym_membership_price")}
                />
                <p>{errorsGymProfile.gym_membership_price?.message}</p>
              </div>
              <label for="fname" className="m-3 mb-1">
                Gender Facilitation
              </label>
              <FormControl className="m-3 mt-0 w-50 dropdown-trainer">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="gender_facilitation"
                  {...controlGymProfile("gender_facilitation")}
                  defaultValue={getGym.gender_facilitation}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Both">Both</MenuItem>
                </Select>
              </FormControl>
              <p>{errorsGymProfile.gender_facilitation?.message}</p>

              <label for="" className="m-3 mb-1">
                Gym Description
              </label>

              <textarea
                className="text-field m-3 mt-0 "
                name="gym_desc"
                {...controlGymProfile("gym_desc")}
                defaultValue={getGym.gym_desc}
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

              <p className="m-3 general-p">
                Submit Profile to the Admin. Admin will review your profile and Approve it:
              </p>
              <Button type="submit" className="w-25 m-3">
                Submit
              </Button>
            </form>
          </div>
        </div>
      ) : isGymPicForm ? (
        <div>
          <Button
            onClick={() => {
              setIsGymPicForm(false);
              setIsProfile(true);
            }}
          >
            back
          </Button>
          <div>
            <p className="general-p">Please upload at least 3 gym pictures</p>

            {errorPic ? (
              <p className="text-danger">Please Enter Right Format (PNG,JPEG,JPG)</p>
            ) : null}

            <form onSubmit={changeOnClick} encType="multipart/form-data">
              <div className="upload-form">
                <input
                  multiple
                  style={{ marginTop: "1rem" }}
                  accept="image/*"
                  type="file"
                  filename="gym"
                  // onChange={onChangeFile}
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                />
                {/* <input
                style={{ marginTop: "1rem" }}
                accept="image/*"
                type="file"
                filename="gym"
                onChange={onChangeFile}
                />
              <input
                style={{ marginTop: "1rem" }}
                accept="image/*"
                type="file"
                filename="gym"
                onChange={onChangeFile}
              /> */}
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
        </div>
      ) : isProfile ? (
        <div className="trainer-desc mt-3 d-flex flex-column">
          <div className="d-flex ">
            <div className="d-flex w-75 justify-content-between">
              <div className="trainer-img d-flex">
                <div className="m-4 d-flex mt-5 flex-column">
                  <h4>Gym Name: {getGym.user_id?.full_name}</h4>
                  <h4>
                    Location: {getGym.location?.address}, {getGym.location?.city},{" "}
                    {getGym.location?.state}{" "}
                  </h4>
                  <h4>Gender: {getGym.gender_facilitation}</h4>
                  <h4>Status: {getGym.listed}</h4>
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
                    setIsGymForm(false);
                    setIsProfile(false);
                    setIsAsk(false);
                    setIsGymPicForm(true);
                  }}
                >
                  Edit Pictures
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
                          gymProfileDetails = {
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
          <div className="slider-div d-flex justify-content-center p-5">
            <Carousel width="70%">
              {gymPhotos.length == 0 ? (
                <h2>No photos</h2>
              ) : (
                gymPhotos.map((e, index) => {
                  return (
                    <div key={index}>
                      <img src={e.photo_url} />
                    </div>
                  );
                })
              )}
            </Carousel>
          </div>
          <div className="m-4 d-flex flex-column">
            <h4>Gym Contact Number: {getGym.gym_contact_no}</h4>
            <h4>Gym Membership Price: {getGym.gym_membership_price} Rs</h4>
            <h4>About Gym: </h4>
            <p> {getGym.gym_desc}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GymProfile;
