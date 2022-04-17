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
  location: yup.string().required(),
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
  const [isGymForm, setIsGymForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");
  const [gymProfileDetails, setGymProfileDetails] = useState({
    user_id: {
      full_name: "",
      email: "",
      password: "",
      user_type: "gym",
    },
    location: "",
    gym_desc: "",
    gym_contact_no: "",
    gym_membership_price: "",
    gender_facilitation: "",
    gym_photo: "",
  });

  var temp = {
    locationTemp: "",
    gym_descTemp: "",
    gym_contact_noTemp: "",
    gym_membership_priceTemp: "",
    gender_facilitationTemp: "",
    gym_photoTemp: "",
  };

  // const get_gym_info = () => {
  //   gymService
  //     .get_gym(userService.getLoggedInUser()._id)
  //     .then((data) => {
  //       console.log(data.crud.user_id.full_name);
  //       // setGymProfileDetails({
  //       //   ...gymProfileDetails,
  //       //   user_id: {
  //       //     ...gymProfileDetails.user_id,
  //       //     full_name: data.crud.user_id.full_name,
  //       //     email: data.crud.user_id.email,
  //       //     password: data.crud.user_id.password,
  //       //   },
  //       // });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.response.data, {
  //         position: toast.POSITION.TOP_LEFT,
  //       });
  //     });
  // };

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      // console.log("log in first");
    }
  }, []);

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("frontImage", fileName);

    axios
      .post("/cards/add", formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    register: controlGymProfile,
    handleSubmit: handleSubmitGymProfile,
    formState: { errors: errorsGymProfile },
  } = useForm({
    resolver: yupResolver(gymProfileSchema),
  });

  const submitGymProfileForm = (data) => {
    // console.log("aaaaaaa");
    // setStep3(false);
    // setStep4(true);
    // setTrainerDetails({ ...trainerDetails, weekly_goal: data.weekly_goal });
    // console.log(trainerDetails);
    // console.log("aaaaaaa");
    console.log("before request");
    setGymProfileDetails({
      ...gymProfileDetails,
      location: data.location,
      gym_desc: data.gym_desc,
      gym_contact_no: data.gym_contact_no,
      gym_membership_price: data.gym_membership_price,
      gender_facilitation: data.gender_facilitation,
      gym_photo: data.gym_photo,
    });
    gymService
      .update_gym(gymProfileDetails, loggedInId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
    console.log(gymProfileDetails);
    console.log("after request");
  };

  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuGym />

      <h2>Gym Profile</h2>
      {!isProfile ? (
        !isGymForm ? (
          <div className="gym-box mt-3 d-flex flex-column justify-content-start">
            <h4>There is no profile present. Click below to create a gym profile:</h4>
            <Button
              className="w-25 mt-4"
              onClick={() => {
                setIsGymForm(true);
                // get_gym_info();
              }}
            >
              Create Profile
            </Button>
          </div>
        ) : (
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
                <input type="text" name="location" {...controlGymProfile("location")} />
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

              <label for="">Gym Picture</label>
              <p className="general-p">Please upload your gym's picture</p>
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
        )
      ) : (
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Gym Name</th>
                    <th>Status</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mister Fit Gym</td>
                    <td>Approved</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button className="btn btn-warning edit-btn">Edit </Button>

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
                              <h3>Are you sure you want to delete the profile?</h3>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymProfile;
