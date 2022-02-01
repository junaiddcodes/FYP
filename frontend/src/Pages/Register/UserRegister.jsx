import React, { useState } from "react";
import "../../styles/pages.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const UserRegister = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [selectedClass, setSelectedClass] = useState("selected");
  return (
    <div className="page-container d-flex justify-content-center">
      {step1 ? (
        <div className="outer-box-step1 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center mb-3">User Signup</h2>
          <div className="inner-box-step1 d-flex ">
            <div className="d-flex flex-column w-50 ">
              <div className="d-flex flex-column">
                <h3 className="p-4 pb-0">Your Name:</h3>
                <input type="text" />
              </div>
              <div className="d-flex flex-column">
                <h3 className="p-4 pb-0">Your DOB:</h3>
                <input type="text" placeholder="dd/mm/yyyy" />
              </div>
              <div className="d-flex flex-column">
                <h3 className="p-4 pb-0">Your Gender:</h3>
                <div className="d-flex justify-content-around">
                  <div className="radio w-25 d-flex ">
                    <input type="radio" name="gender" value="male" />
                    <p className="m-2">Male</p>
                  </div>
                  <div className="radio w-25 d-flex  ">
                    <input type="radio" name="gender" value="female" />
                    <p className="m-2">Female</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column w-50">
              <div className="d-flex flex-column">
                <h3 className="p-4 pb-0">Email:</h3>
                <input type="text" />
              </div>
              <div className="d-flex flex-column">
                <h3 className="p-4 pb-0">Password:</h3>
                <input type="password" />
              </div>
            </div>
          </div>

          <div className="buttons-step1 d-flex justify-content-between mt-3">
            <Link className="step1-btn" to="/register">
              <Button>back</Button>
            </Link>

            <Button
              onClick={() => {
                setStep1(false);
                setStep2(true);
              }}
            >
              next
            </Button>
          </div>
        </div>
      ) : step2 ? (
        <div className="outer-box-step2 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center mb-3">User Signup</h2>
          <div className="inner-box-step2 d-flex ">
            <div className="d-flex flex-column w-50  ">
              <div className="d-flex flex-column w-75">
                <h3 className="p-4 pb-0">Your Current Weight:</h3>
                <div className="d-flex justify-content-center">
                  <input type="text" placeholder="Weight" />
                  <FormControl className="m-3 dropdown">
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select">
                      <MenuItem value="lbs">lbs</MenuItem>
                      <MenuItem value="kgs">kgs</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="d-flex flex-column w-75">
                <h3 className="p-4 pb-0">Your Current height:</h3>
                <div className="d-flex justify-content-center">
                  <input type="text" placeholder="Height" />
                  <FormControl className="m-3 dropdown">
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select">
                      <MenuItem value="feet">feet</MenuItem>
                      <MenuItem value="cms">cms</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column w-50">
              <div className="btn-group d-flex flex-column h-100 align-items-stretch">
                <h3 className="p-4 pb-0">What is your baseline activity level?:</h3>

                <div className="activity-btn d-flex ">
                  <input type="radio" name="gender" value="not very active" />
                  <div className="d-flex flex-column w-75 ">
                    <h4>Not Very Active</h4>
                    <p>Spend most of the day sitting ( e.g. bank teller, desk job) </p>
                  </div>
                </div>
                <div className="activity-btn d-flex justify-content-between">
                  <input type="radio" name="gender" value="not very active" />
                  <div className="d-flex flex-column w-75">
                    <h4>Lightly Active</h4>
                    <p>Spend a good part of your day on your feet ( e.g. teacher, salesperson )</p>
                  </div>
                </div>
                <div className="activity-btn d-flex justify-content-between">
                  <input type="radio" name="gender" value="not very active" />
                  <div className="d-flex flex-column w-75">
                    <h4>Active</h4>
                    <p>
                      {" "}
                      Spend a good part of your day doing some physical activity ( e.g. food server,
                      postal carrier )
                    </p>
                  </div>
                </div>
                <div className="activity-btn d-flex justify-content-between">
                  <input type="radio" name="gender" value="not very active" />
                  <div className="d-flex flex-column w-75">
                    <h4>Very Active</h4>
                    <p>
                      Spend a good part of the day doing heavy physical activity ( e.g. bike
                      messenger, carpenter )
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons-step2 d-flex justify-content-between mt-3">
            <Button
              onClick={() => {
                setStep2(false);
                setStep1(true);
              }}
            >
              back
            </Button>

            <Button
              onClick={() => {
                setStep2(false);
                setStep3(true);
              }}
            >
              next
            </Button>
          </div>
        </div>
      ) : step3 ? (
        <div className="outer-box-step3 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center mb-3">User Signup</h2>
          <div className="btn-group2 inner-box-step3 d-flex flex-column">
            <h3 className="text-center p-4 pb-0 w-100">What is your weight goal?</h3>

            <div className="activity-btn d-flex justify-content-between">
              <input type="radio" name="gender" value="not very active" />
              <div className="d-flex flex-column w-75 ">
                <h4>Lose Weight</h4>
              </div>
            </div>
            <div className="activity-btn d-flex justify-content-between">
              <input type="radio" name="gender" value="not very active" />
              <div className="d-flex flex-column w-75">
                <h4>Maintain Weight</h4>
              </div>
            </div>
            <div className="activity-btn d-flex justify-content-between">
              <input type="radio" name="gender" value="not very active" />
              <div className="d-flex flex-column w-75">
                <h4>Gain Weight</h4>
              </div>
            </div>
          </div>

          <div className="buttons-step3 d-flex justify-content-between mt-3">
            <Button
              onClick={() => {
                setStep3(false);
                setStep2(true);
              }}
            >
              back
            </Button>

            <Button
              onClick={() => {
                setStep3(false);
                setStep4(true);
              }}
            >
              next
            </Button>
          </div>
        </div>
      ) : step4 ? (
        <div className="outer-box-step4 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center mb-3">User Signup</h2>
          <div className="btn-group2 inner-box-step4 d-flex flex-column">
            <h3 className="text-center p-4 pb-0 w-100">What is your weekly goal?</h3>

            <div className="activity-btn d-flex justify-content-between">
              <input type="radio" name="gender" value="not very active" />
              <div className="d-flex flex-column w-75 ">
                <h4>Lose 0.5 pounds per week (Recommended)</h4>
              </div>
            </div>
            <div className="activity-btn d-flex justify-content-between">
              <input type="radio" name="gender" value="not very active" />
              <div className="d-flex flex-column w-75">
                <h4>Lose 1 pound per week</h4>
              </div>
            </div>
          </div>

          <div className="buttons-step3 d-flex justify-content-between mt-3">
            <Button
              onClick={() => {
                setStep4(false);
                setStep3(true);
              }}
            >
              back
            </Button>

            <Button>Signup</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserRegister;
