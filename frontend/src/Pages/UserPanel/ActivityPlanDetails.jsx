import React, { useEffect, useState } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../../services/UserService";
import trainerService from "../../services/TrainerService";
import StripeContainer from "../../Components/Stripe/StripeContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityPlanDetails = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [allPlans, setAllPlans] = useState([]);
  const [showItem, setShowItem] = useState(false);
  // const data = location.state.e;
  var data = location.state.e;
  var order = {
    user_id: "",
    plan_id: "",
  };

  const [orderX, SetOrderX] = useState({
    user_id: "",
    plan_id: "",
    trainer_id: "",
    price: 0,
    time_date: new Date().getTime(),
  });
  var userId = "";

  const getAllPlans = (id) => {
    userService
      .get_all_plans(id)
      .then((data) => {
        console.log(data);
        setAllPlans(data.crud);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const notify = () => {
    // Calling toast method by passing string
    toast.success("Plan bought and moved to my plans");
  };
  const checkPlan = () => {
    userService
      .check_plan(order)
      .then((data) => {
        console.log(data);

        console.log("Plan already Bought");
        setShowItem(false);
      })
      .catch((err) => {
        console.log("Plan not Bought");
        setShowItem(true);
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
      console.log("state data = ", location.state.e);

      SetOrderX({
        ...orderX,
        plan_id: location.state.e._id,
        user_id: userId,
        trainer_id: location.state.e.trainer_id,
        plan_title: location.state.e.plan_title,
        price: location.state.e.plan_price,
      });
      order.plan_id = location.state.e._id;
      order.user_id = userId;
      data = location.state.e;
      getAllPlans(location.state.e._id);
    } else {
      console.log("state empty");
    }
    if (order) {
      checkPlan();
    }

    // console.log(location.state.e);
  }, []);

  const handleBuyPlan = () => {
    console.log(orderX);
    userService
      .buy_plan(orderX)
      .then((data) => {
        console.log(data);
        console.log("plan bought");
        checkPlan();
        setConfirmDelete(false);
        order.plan_id = location.state.e._id;
        order.user_id = userId;
        setShowItem(false);
        notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <h2> {data.plan_title} plan</h2>
      <div className="trainer-desc mt-3 d-flex flex-column">
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
              <StripeContainer
                amount={data.plan_price}
                action={handleBuyPlan}
                description="Trainer Plan Payment"
              />
            </div>
          </Modal>
        </div>

        <div className="d-flex ">
          <div className="d-flex w-75">
            <div className="trainer-img d-flex">
              <div className="App">
                <>
                  <div className="d-flex mt-5 flex-column">
                    <h4>Duration: {data.plan_duration} weeks</h4>
                    <h4>Price: {data.plan_price} PKR</h4>
                    <h4>Description: </h4>
                    <p> {data.plan_desc}</p>
                    {showItem ? (
                      <Button
                        className="w-25 m-3"
                        onClick={() => setConfirmDelete(true)}
                      >
                        Buy plan
                      </Button>
                    ) : (
                      <p className="text-success">Plan already bought</p>
                    )}
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-3"> Reviews</h2>
      <div className="trainer-desc mt-3 d-flex flex-column p-4">
        {allPlans.length === 0 ? (
          <p>Not reviewed Yet</p>
        ) : (
          allPlans.map((e, key) => {
            return e.review ? (
              <div key={key}>
                <div className="text-light d-flex align-items-center">
                  <div>
                    <i class="bx bxs-star mr-2 text-warning"></i>
                    <span> {e.review} </span>
                  </div>
                  <div>
                    <p className="font-weight-bold">{e.user_id.user_id.full_name}</p>
                  </div>
                </div>
                <div>
                  <p>{e.review_comment}</p>
                </div>
              </div>
            ) : null;
          })
        )}
      </div>
    </div>
  );
};

export default ActivityPlanDetails;
