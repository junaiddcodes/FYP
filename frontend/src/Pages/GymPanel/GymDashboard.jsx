import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

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
import { TextField } from "@mui/material";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: blue;
`;

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
  // const [getGym, setGetGym] = useState("");
  const [isGymForm, setIsGymForm] = useState(false);
  const [gymPhotos, setGymPhotos] = useState([]);
  const [isGymPicForm, setIsGymPicForm] = useState(false);
  const [isListed, setIsListed] = useState("default");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");
  const [file, setFile] = useState(null);
  const [errorPic, setPicError] = useState(false);
  const [boughtPlans, setBoughtPlans] = useState([]);
  const [totalEarning, setTotalEarning] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState([]);
  const location = useGeoLocation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [confirmDeleteX, setConfirmDeleteX] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBankOpen, setEditBankOpen] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const schema = yup.object().shape({
    bank_name: yup.string().required("Bank Name is Required"),
    account_number: yup.string().required("Account Number is Required"),
    account_name: yup.string().required("Account Name is Required"),
  });
  const [getGym, setGetGym] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  var loginId = "";

  function getGymSales() {
    var totalPrice = 0;
    var withdrawPrice = 0;
    gymService
      .get_gym_membership(loginId)
      .then((res) => {
        setBoughtPlans(res.crud);
        res.crud.map((e) => {
          totalPrice = e.price + totalPrice;
          if (e.withdraw) {
            withdrawPrice = withdrawPrice + e.price;
          }
        });
        setTotalEarning(totalPrice);
        setWithdrawAmount(withdrawPrice);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function withdrawRequest() {
    var userId = userService.getLoggedInUser()._id;

    var withdrawReq = {
      user_id: userId,
      amount: withdrawAmount,
      user_type: "gym",
    };

    gymService
      .withdraw_request(withdrawReq)
      .then((res) => {
        console.log("Withdraw Request Confirmed");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleBanksubmit(data) {
    loginId = userService.getLoggedInUser()._id;
    var bankDetails = {
      bank_details: {
        bank_name: data.bank_name,
        account_number: data.account_number,
        account_name: data.account_name,
      },
    };

    gymService
      .update_gym(bankDetails, loginId)
      .then((res) => {
        console.log("Bank Added Successfully");
        get_gym();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const get_gym = () => {
    gymService
      .get_one_gym(loginId)
      .then((res) => {
        if (res.crud.bank_details) {
          setIsBank(true);
        }
        setGetGym(res.crud);
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

  const page_refresh = () => {
    window.location.reload(true);
  };

  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuGym />
      {loading ? (
        <BarLoader
          loading={loading}
          color="#063be9"
          css={override}
          size={150}
        />
      ) : null}

      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <p className="font-weight-bold text-light">
              Available to Withdraw (Rs): {withdrawAmount.length !=0?withdrawAmount:0}
            </p>
            <p className="font-weight-bold text-light">
              Total Earning (Rs): {totalEarning.length !=0?totalEarning:0}
            </p>
          </div>
        </div>
      </div>

      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <h3 className="text-light">Membership Activity</h3>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Membership ID</th>
                    <th>Member Name</th>
                    <th>Earnings (Rs)</th>
                    <th>Status</th>
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
                          {e.withdraw ? (
                            <td>Available for Withdraw</td>
                          ) : (
                            <td>Withdrawn</td>
                          )}
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
      <div className="mt-3 d-flex">
        <div>
          <Button
            className="btn btn-primary edit-btn"
            onClick={() => {
              setEditModalOpen(true);
            }}
          >
            Withdraw
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
              <div className="modal-inner w-75 py-3 text-light">
                <a
                  onClick={() => {
                    setEditModalOpen(false);
                  }}
                >
                  <i class="bx bx-x"></i>
                </a>

                <div className="mt-2">
                  <h2>Withdraw</h2>
                  <p className="text-light">
                    Withdraw Amount Should be Greater Than Rs 10000
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-light">
                    Withdraw Amount(Rs): {withdrawAmount}
                  </p>
                  {withdrawAmount < 10000 ? (
                    <p className="text-danger">
                      Withdraw amount is less than Rs 10000
                    </p>
                  ) : null}
                  {isBank ? (
                    <div>
                      <p className="text-light">
                        Bank Name: {getGym.bank_details?.bank_name}
                      </p>
                      <p className="text-light">
                        Account#: {getGym.bank_details?.account_number}
                      </p>
                      <p className="text-light">
                        Account Name: {getGym.bank_details?.account_name}
                      </p>
                    </div>
                  ) : (
                    <p className="text-light">
                      Bank is not Added yet.{" "}
                      <a
                        className="text-underline"
                        onClick={() => {
                          setEditModalOpen(false);
                          setEditBankOpen(true);
                        }}
                      >
                        Click here to add the Banks
                      </a>
                    </p>
                  )}
                </div>
                {withdrawAmount >= 10000 && isBank ? (
                  <div className="mt-2">
                    <Button
                      className="btn btn-primary edit-btn"
                      onClick={() => {
                        console.log("Text");
                        withdrawRequest();
                      }}
                    >
                      Confirm Withdraw
                    </Button>
                  </div>
                ) : null}
              </div>
            </Modal>
          </div>
        </div>

        <div>
          <Button
            className="btn btn-primary edit-btn"
            onClick={() => {
              setEditBankOpen(true);
            }}
          >
            Bank Details
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
              isOpen={editBankOpen}
              onRequestClose={() => {
                setEditBankOpen(false);
              }}
            >
              <div className="modal-inner w-75 py-3 text-light">
                <a
                  onClick={() => {
                    setEditBankOpen(false);
                  }}
                >
                  <i class="bx bx-x"></i>
                </a>
                <h2 className="text-light">Enter Bank Details</h2>
                <form
                  onSubmit={handleSubmit(handleBanksubmit)}
                  className="d-flex flex-column"
                >
                  <div className="mt-2">
                    <TextField
                      id="demo-simple-select-2"
                      className="w-100"
                      variant="outlined"
                      name="bank_name"
                      type="text"
                      {...register("bank_name")}
                      placeholder="Enter Bank Name"
                      InputLabelProps={{
                        style: { color: "#777" },
                      }}
                    />
                    <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                      {errors.bank_name?.message}
                    </p>
                  </div>
                  <div className="mt-2">
                    <TextField
                      id="demo-simple-select-2"
                      className="w-100"
                      variant="outlined"
                      name="account_number"
                      type="text"
                      {...register("account_number")}
                      placeholder="Enter Account Number"
                      InputLabelProps={{
                        style: { color: "#777" },
                      }}
                    />
                    <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                      {errors.account_number?.message}
                    </p>
                  </div>
                  <div className="my-2">
                    <TextField
                      id="demo-simple-select-2"
                      className="w-100"
                      variant="outlined"
                      name="account_name"
                      type="text"
                      {...register("account_name")}
                      placeholder="Enter Account Name"
                      InputLabelProps={{
                        style: { color: "#777" },
                      }}
                    />
                    <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                      {errors.account_name?.message}
                    </p>
                  </div>
                  <div>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDashboard;
