import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import { func } from "joi";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAccordionDetailsUtilityClass } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useNavigate } from "react-router-dom";

const AddWater = () => {
  const [modalOpen, setModalOpen] = useState(false);
  var [errorMessage, setErrorMessage] = useState("");
  var [waterAmount, setWaterAmount] = useState();
  const navigate = useNavigate();

  var user_id = userService.getLoggedInUser()._id;

  var waterIntake = {
    user_id: "",
    amount_litres: 0,
    time_date: "",
  };
  const [isInitialRender, setIsInitialRender] = useState(true);
  const dateX = new Date().getTime();

  function getWaterData() {
    userService
      .waterPage(user_id)
      .then((data) => {
        var waterIntake = data.crud.map((e) => {
          var data = 0;
          data = data + e.amount_litres;
          return data;
        });

        // Getting sum of numbers
        var sumWater = waterIntake.reduce(function (a, b) {
          return a + b;
        }, 0);

        setWaterAmount(sumWater);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function waterValidationForm() {
    if (water.current.value < 0.1) {
      // console.log('value is invalid')
      setErrorMessage("value is invalid");
      return false;
    } else {
      setErrorMessage("");
    }

    waterIntake = {
      ...waterIntake,
      amount_litres: water.current.value,
      user_id: user_id,
      time_date: new Date().getTime(),
    };

    console.log("before request");

    console.log('before request')
    notify()

    userService.waterIntake(waterIntake);
    getWaterData();
  }
  const water = useRef(null);

  useEffect(() => {
    if (userService.isLoggedIn() == false) {
      navigate('/login')
    } else {
      if (
        userService.getLoggedInUser().user_type == 'trainer' ||
        userService.getLoggedInUser().user_type == 'gym' ||
        userService.getLoggedInUser().user_type == 'admin'
      ) {
        navigate('/login')
      }
    }
    getWaterData();
  }, [getWaterData]);

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Add Water</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4 className="mt-2 mb-2">Water Taken (ltrs): {waterAmount}</h4>
              <h4 className="mt-2">Water Goal (ltrs): 6 </h4>
            </div>
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Water Taken</h2>
      </div>
      <div className="align-items-left">
        <input
          ref={water}
          className="input-modal"
          type="number"
          placeholder="Water in Ltrs"
          // onChange={(e) => {
          //   setWaterIntake({
          //     ...waterIntake,
          //     amount_litres: water.current.value,
          //     user_id: 'String',
          //     time_date: date,
          //   })
          // }}
        />
      </div>
      <Button className="mt-3" onClick={waterValidationForm}>
        + Add Water
      </Button>
      {errorMessage && (
        <p className="error" style={{ color: "yellow" }}>
          {" "}
          {errorMessage}{" "}
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddWater;
