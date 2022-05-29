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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const querySchema = yup.object().shape({
  query_response: yup
    .string()
    .min(10, "Description must be at least 10 characters!")
    .required("query description can't be empty"),
});

const QueryDetails = () => {
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [queryDesc, setQueryDesc] = useState([]);
  const data = location.state.e;

  var queryDetails = {
    query_response: " ",
  };
  const {
    register: controlQuery,
    handleSubmit: handleSubmitQuery,
    formState: { errors: errorsQuery },
  } = useForm({
    resolver: yupResolver(querySchema),
  });

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
    if (location.state) {
      setQueryDesc(location.state.e.query_desc);
      console.log("query desc = ", location.state.e.query_desc);
    }
    // console.log(userInfo.user_id.full_name);
  }, []);

  const submitQueryForm = (e) => {
    console.log("in request");
    var index = 0;
    for (var i = 0; i < queryDetails.length; i++) {
      if (queryDetails[i].query_response == "?") {
        index = i;
      }
    }

    // queryDetails = {

    //   query_desc[index].query_response:response,
    // };
    console.log("in queryDesc = ", queryDesc);
    console.log("after entering response = ", queryDetails);
    // adminService
    //   .update_query(queryDetails, data._id)
    //   .then((data) => {
    //     console.log(data);
    //     navigate("/admin-dashboard");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        {queryDesc.map((e, key) => {
          return (
            <div>
              <h4 className="mt-2">Query Details: </h4>
              <p>{e.query_text}</p>
              <h4 className="mt-2">Admin Response: </h4>
              {!e.query_response == "?" ? <p>e.query_response</p> : <p>No response yet!</p>}
            </div>
          );
        })}
        <form onSubmit={handleSubmitQuery(submitQueryForm)}>
          <textarea
            {...controlQuery("query_response")}
            name="query_response"
            className="text-field mt-2"
            value={response}
            placeholder="Enter your response"
            onChange={(event) => {
              setResponse(event.target.value);
              console.log(event.target.value);
            }}
          />
          <p>{errorsQuery.query_response?.message}</p>
          <Button type="submit" className="w-25 mt-3">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QueryDetails;
