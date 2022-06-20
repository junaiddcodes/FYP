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

const GymDashboard = () => {
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
      get_gym();
    });
  }

  function getGymSales() {
    gymService
      .get_gym_membership(loginId)
      .then((res) => {
        setBoughtPlans(res.crud);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const get_gym = () => {
    gymService
      .get_one_gym(loginId)
      .then((res) => {
        console.log(res);
        setGetGym(res.crud);
        console.log(res.crud.gym_photos);
        setGymPhotos(res.crud.gym_photos);

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
    getGymSales();
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

      <h3>Customer Name</h3>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Membership ID</th>
                    <th>Activity Plan Title</th>
                    <th>Earnings (Rs)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {boughtPlans.length == 0 ? (
                    <tr>
                      <td>There are no Sales for now</td>
                    </tr>
                  ) : (
                    boughtPlans.map((e, key) => {
                      return (
                        <tr key={key}>
                          <td>{e._id}</td>
                          <td>{e.user_id.user_id.full_name}</td>
                          <td>{e.price}</td>
                          <td>{moment(e.time_date).format("DD/MM/YYYY")}</td>
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
    </div>
  );
};

export default GymDashboard;
