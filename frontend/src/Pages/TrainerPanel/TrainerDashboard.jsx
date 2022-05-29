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
import userService from "../../services/UserService";
import trainerService from '../../services/TrainerService'
import moment from "moment";

const TrainerDashboard = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const userId = userService.getLoggedInUser()._id
  const [boughtPlans, setBoughtPlans] = useState([])

  function getTrainerSales(){
    trainerService.get_bought_plans(userId).then((res)=>{
      setBoughtPlans(res.crud)
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      if (
        userService.getLoggedInUser().user_type == "customer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
    getTrainerSales()
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
                  boughtPlans.map((e,key)=>{
                    return(

                      <tr>
                      <td>{key+1}</td>
                      <td>{e.plan_title}</td>
                      <td>{e.price}</td>
                      <td>{moment(e.time_date).format("DD/MM/YYYY") }</td>
                    </tr>

                    )
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

export default TrainerDashboard;
