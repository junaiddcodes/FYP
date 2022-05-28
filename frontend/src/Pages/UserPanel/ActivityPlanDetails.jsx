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
  var userId = "";

  const checkPlan = () => {
    userService
      .check_plan(order)
      .then((data) => {
        console.log(data);

        console.log("Plan already Bought");
        setShowItem(false)
      })
      .catch((err) => {
        console.log(err);
        console.log("Plan not Bought");
        setShowItem(true)
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
      order.plan_id = location.state.e._id;
      order.user_id = userId;
      data = location.state.e;
    } else {
      console.log("state empty");
    }
    if (order) {
      checkPlan();
    }
    // console.log(location.state.e);
  }, []);
  const handleBuyPlan = () => {
    userService
      .buy_plan(order)
      .then((data) => {
        console.log(data);
        console.log("plan bought");
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
                    ) : <p className="text-success">Plan already bought</p>}
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPlanDetails;
