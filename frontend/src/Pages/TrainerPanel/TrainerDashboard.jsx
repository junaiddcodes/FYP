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
import { Link } from "react-router-dom";
import TopBar from "../../Components/TopBar";
import SideMenuTrainer from "../../Components/SideMenuTrainer";
import { useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      // console.log("log in first");
    }
  }, []);
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuTrainer />
      <h3>Recent Plan Sales</h3>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Activity Plan Title</th>
                    <th>Earnings</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>60 Days Plan</td>
                    <td>8000</td>
                    <td>12/12/2021</td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>60 Days Plan</td>
                    <td>8000</td>
                    <td>12/12/2021</td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>60 Days Plan</td>
                    <td>8000</td>
                    <td>12/12/2021</td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>60 Days Plan</td>
                    <td>8000</td>
                    <td>12/12/2021</td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>60 Days Plan</td>
                    <td>8000</td>
                    <td>12/12/2021</td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>60 Days Plan</td>
                    <td>8000</td>
                    <td>12/12/2021</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
