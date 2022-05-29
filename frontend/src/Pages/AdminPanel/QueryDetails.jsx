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
import SideMenuAdmin from "../../Components/SideMenuAdmin";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import userService from "../../services/UserService";
import gymService from "../../services/GymService";
import trainerService from "../../services/TrainerService";
import adminService from "../../services/AdminService";

const QueryDetails = () => {
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const data = location.state.e;
  var queryDetails = {
    query_response: " ",
  };

  const get_user = () => {
    userService
      .get_user(data.user_id)
      .then((data) => {
        console.log(data);
        setUserInfo(data.crud);
        setName(data.crud.user_id.full_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get_gym = () => {
    gymService
      .get_one_gym(data.user_id)
      .then((data) => {
        console.log(data);

        setUserInfo(data.crud);
        setName(data.crud.user_id.full_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get_trainer = () => {
    trainerService
      .get_one_trainer(data.user_id)
      .then((data) => {
        console.log(data);

        setUserInfo(data.crud);
        setName(data.crud.user_id.full_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login/admin");
      // console.log("log in first");
    }
    if (
      userService.getLoggedInUser().user_type == "customer" ||
      userService.getLoggedInUser().user_type == "gym" ||
      userService.getLoggedInUser().user_type == "trainer"
    ) {
      navigate("/login/admin");
    }
    console.log(data.user_type);
    if (data.user_type == "trainer") {
      get_trainer();
    } else if (data.user_type == "gym") {
      get_gym();
    } else {
      get_user();
    }
    console.log(userInfo);

    // console.log(userInfo.user_id.full_name);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    queryDetails = {
      ...queryDetails,
      query_response: response,
    };
    console.log("hm = ", queryDetails);
    adminService
      .update_query(queryDetails, data._id)
      .then((data) => {
        console.log(data);
        navigate("/admin-dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuAdmin />
      <Button
        className="m-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class="bx bx-arrow-back m-1"></i> Back
      </Button>
      <h2>Query Detail</h2>
      <div className="admin-box d-flex flex-column">
        <h4 className="mt-2">User Id: {data.user_id}</h4>
        <h4 className="mt-2">Query Id: {data._id}</h4>
        <h4 className="mt-2">User Name: {name}</h4>
        <h4 className="mt-2">User Type: {data.user_type}</h4>
        <h4 className="mt-2">Query Subject: {data.query_subject}</h4>
        <h4 className="mt-2">Query Details: </h4>
        <p>{data.query_desc}</p>
        <h4 className="mt-2">Admin Response: </h4>
        <form onSubmit={handleSubmit}>
          <textarea
            className="text-field mt-2"
            value={response}
            onChange={(event) => {
              setResponse(event.target.value);
              console.log(event.target.value);
            }}
            placeholder="Enter your response"
          />
          <Button type="submit" className="w-25 mt-3">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QueryDetails;
