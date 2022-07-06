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
import gymService from "../../services/GymService";

const MyMembership = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [membership, setMembership] = useState([]);
  var name = "";
  // const data = location.state.e;
  var userId = "";
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

    const get_membership = () => {
      gymService
        .get_user_membership(userId)
        .then((data) => {
          console.log("plan data = ", data);
          setMembership(data.plans);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    get_membership();
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />

      <h2>My Memberships</h2>
      <div className=" mt-5">
        {membership.length == 0 ? (
          <h2>No membership</h2>
        ) : (
          membership.map((e, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  navigate("/gym-description/" + e._id);
                }}
                className="activity-grid-container d-flex flex-column m-3"
              >
                <div className="activity-card grid-item p-3">
                  <h4>{e.user_id.full_name}</h4>
                  <h4 className="mt-3">Description </h4>
                  <p className="text-light">{e.gym_desc}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>Gender Facilitation: </h4>
                      <p className="text-light">{e.gender_facilitation} weeks</p>
                    </div>
                    <div>
                      <h4>Price: </h4>
                      <p className="text-light">{e.gym_membership_price} PKR</p>
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

export default MyMembership;
