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
// import { useNavigate } from "react-router-dom";

const AddWater = () => {
<<<<<<< HEAD
  const [modalOpen, setModalOpen] = useState(false)
  var [errorMessage, setErrorMessage] = useState('')
  var [waterAmount, setWaterAmount] = useState()

  var user_id = userService.getLoggedInUser()._id
=======
  const [modalOpen, setModalOpen] = useState(false);
  var [errorMessage, setErrorMessage] = useState("");
  var [waterAmount, setWaterAmount] = useState();
  const navigate = useNavigate();

  var user_id = userService.getLoggedInUser()._id;
>>>>>>> ea8bed4a2dc65d90ad6164ed346f9a5da94c252d

  var waterIntake = {
    user_id: "",
    amount_litres: 0,
<<<<<<< HEAD
    time_date: '',
  }
  const [isInitialRender, setIsInitialRender] = useState(true)
  const dateX = new Date().getTime()
=======
    time_date: "",
  };
  const [isInitialRender, setIsInitialRender] = useState(true);
  const date = new Date().getTime();
>>>>>>> ea8bed4a2dc65d90ad6164ed346f9a5da94c252d

  function getWaterData() {
    userService
      .waterPage(user_id)
      .then((data) => {
        var waterIntake = data.crud.map((e) => {
<<<<<<< HEAD
          var data = 0
          data = data + e.amount_litres
          return data
        })

        // Getting sum of numbers
        var sumWater = waterIntake.reduce(function (a, b) {
          return a + b
        }, 0)

        setWaterAmount(sumWater)
      })
      .catch((err) => {
        console.log(err)
      })
=======
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
>>>>>>> ea8bed4a2dc65d90ad6164ed346f9a5da94c252d
  }

  function waterValidationForm() {
    if (water.current.value < 0.1) {
      // console.log('value is invalid')
<<<<<<< HEAD
      setErrorMessage('value is invalid')
      return false
=======
      setErrorMessage("value is invalid");
>>>>>>> ea8bed4a2dc65d90ad6164ed346f9a5da94c252d
    } else {
      setErrorMessage("");
    }

    waterIntake = {
      ...waterIntake,
      amount_litres: water.current.value,
      user_id: user_id,
<<<<<<< HEAD
      time_date: new Date().getTime(),
    }

    console.log('before request')
    
    userService.waterIntake(waterIntake)
    getWaterData()
=======
      time_date: date,
    };

    console.log("before request");
    //userService.waterIntake(waterIntake)
    getWaterData();
>>>>>>> ea8bed4a2dc65d90ad6164ed346f9a5da94c252d
  }

  const water = useRef(null);

<<<<<<< HEAD
  useEffect(getWaterData, [getWaterData])
=======
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      getWaterData();
    }
  }, []);
>>>>>>> ea8bed4a2dc65d90ad6164ed346f9a5da94c252d

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
    </div>
  );
};

export default AddWater;
