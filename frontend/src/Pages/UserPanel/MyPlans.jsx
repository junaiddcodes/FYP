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
import { ClimbingBoxLoader, BarLoader, CircleLoader } from "react-spinners";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: blue;
`;
const MyPlans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allPlans, setAllPlans] = useState([]);
  const [loading, setLoading] = useState([]);
  var name = "";
  // const data = location.state.e;
  var userId = "";
  useEffect(() => {
    setLoading(true);
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

    const get_plans = () => {
      userService
        .get_bought_plans(userId)
        .then((data) => {
          console.log("plan data = ", data);
          setAllPlans(data.plans);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    get_plans();
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>My Plans</h2>
      <div className=" mt-5">
        {loading ? <BarLoader loading={loading} color="#063be9" css={override} size={150} /> : null}

        {allPlans.length == 0 ? (
          <h2>No plans</h2>
        ) : (
          allPlans.map((e, index) => {
            return (
              <div
                onClick={() => {
                  navigate("/my-plan-details", { state: { e, name } });
                }}
                className="activity-grid-container d-flex flex-column m-3"
              >
                <div className="activity-card grid-item p-3">
                  <h4>{e.plan_title} Activity Plan</h4>
                  <h4>Trainer name:</h4>
                  <h4>Description</h4>
                  <p className="text-light">{e.plan_desc}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>Duration:</h4>
                      <p className="text-light">{e.plan_duration} weeks</p>
                    </div>
                    <div>
                      <h4>Price:</h4>
                      <p className="text-light">{e.plan_price} PKR</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyPlans;
