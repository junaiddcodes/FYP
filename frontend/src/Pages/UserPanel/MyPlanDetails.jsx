import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdLocationPin, MdProductionQuantityLimits } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../../services/UserService";
import trainerService from "../../services/TrainerService";
import StripeContainer from "../../Components/Stripe/StripeContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const reviewSchema = yup.object().shape({
  rating: yup.string().required("rating can't be empty"),
  comment: yup
    .string()
    .min(10, "Comment must be at least 10 characters!")
    .required("Comment can't be empty"),
});

const MyPlanDetails = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [planDetails, setPlanDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [showItem, setShowItem] = useState(false);
  var userId = "";
  // const data = location.state.e;
  var data = location.state.e;
  var order = {
    user_id: "",
    plan_id: "",
  };

  const {
    register: controlReview,
    handleSubmit: handleSubmitReview,
    formState: { errors: errorsReview },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  function getOrderDetails() {
    userService
      .get_user_plans(userId, data._id)
      .then((e) => {
        console.log(e);
        setOrderDetails(e.crud);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const submitReviewForm = (data) => {
    var tempObject = {
      order_id: orderDetails._id,
      review: data.rating,
      review_comment: data.comment,
    };

    userService
      .postReview(tempObject)
      .then((data) => {
        console.log(data);
        setEditModalOpen(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      userId = userService.getLoggedInUser()._id;
      if (
        userService.getLoggedInUser().user_type == "trainer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }

    if (location.state) {
      // data = location.state.trainerDetails;
      //   console.log("state data = ", location.state.e);
      setPlanDetails(location.state.e);
      getOrderDetails();
    }
    let arr = [];
    for (var i = 0; i < data.plan_duration; i++) {
      arr.push(planDetails);
      console.log(arr);
    }
    setAllPlans(arr);
    console.log("array = ", arr);
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <div className="d-flex justify-content-between">
        <Button
          className="m-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          <i class="bx bx-arrow-back m-1"></i> Back
        </Button>

        {orderDetails.review ? (
          <p className="text-success">Order Already Reviewed</p>
        ) : (
          <div>
            <Button
              className="m-2 btn-warning"
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              Review plan
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

                  <div className="query-box mt-3 d-flex flex-column align-items-left">
                    <form
                      onSubmit={handleSubmitReview(submitReviewForm)}
                      className="d-flex flex-column"
                    >
                      <label for="fname">Select rating</label>
                      <FormControl className="m-3 w-100 dropdown-trainer">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="rating"
                          {...controlReview("rating")}
                          defaultValue="5"
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5">5</MenuItem>
                        </Select>
                      </FormControl>
                      <p>{errorsReview.rating?.message}</p>
                      <label for="">Comment</label>
                      <textarea
                        className="text-field mt-2"
                        name="comment"
                        {...controlReview("comment")}
                      />
                      <p>{errorsReview.comment?.message}</p>
                      <Button className="w-50" type="submit ">
                        Submit review
                      </Button>
                    </form>
                  </div>
                </div>
                <div></div>
              </Modal>
            </div>
          </div>
        )}
      </div>
      <h2> {planDetails.plan_title} plan</h2>

      <table className="activity-box table table-bordered table-dark">
        <thead>
          <tr>
            <th>Week</th>
            <th>Monday Activities</th>
            <th>Tuesday Activities</th>
            <th>Wednesday Activities</th>
            <th>Thursday Activities</th>
            <th>Friday Activities</th>
            <th>Saturday Activities</th>
            <th>Sunday Activities</th>
          </tr>
        </thead>
        <tbody>
          {allPlans.map((e, index) => {
            return (
              <tr className="activity-box">
                <td key={index}>{index + 1}</td>
                <td>{planDetails.monday_activities}</td>
                <td>{planDetails.tuesday_activities}</td>
                <td>{planDetails.wednesday_activities}</td>
                <td>{planDetails.thursday_activities}</td>
                <td>{planDetails.friday_activities}</td>
                <td>{planDetails.saturday_activities}</td>
                <td>{planDetails.sunday_activities}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyPlanDetails;
