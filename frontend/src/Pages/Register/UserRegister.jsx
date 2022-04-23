import React, { useState } from "react";
import "../../styles/pages.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function calculation(customerDetails, weekly_goal) {
  var height = customerDetails.height / 0.032808;
  var weight = customerDetails.weight;
  var weight_pounds = weight * 2.205;
  var age = getAge(customerDetails.dob);
  var gender = customerDetails.gender;
  var goal = customerDetails.weight_goal;
  var goal_speed = weekly_goal;
  var bmr = 0;
  var calorie = 0;
  var protien = 0;
  var fats = 0;
  var carbs_calorie = 0;
  var carbs = 0;

  if (gender == "male") {
    bmr = 66 + 13.7 * weight + 5 * height - (6.8 - age);
  } else {
    bmr = 65.5 + 9.6 * weight + 1.8 * height - (4.7 - age);
  }
  var TDEE = customerDetails.activity_level * bmr;

  if (goal == "lose_weight") {
    if (goal_speed == 1) {
      calorie = TDEE - TDEE * 0.2;
    } else if (goal_speed == 0.5) {
      calorie = TDEE - TDEE * 0.1;
    }
    protien = weight_pounds;
    fats = weight_pounds / 2;
    carbs_calorie = calorie - (protien * 4 + fats * 9);
    carbs = carbs_calorie / 4;
  } else {
    if (goal_speed == 1) {
      calorie = TDEE + TDEE * 0.2;
    } else if (goal_speed == 0.5) {
      calorie = TDEE + TDEE * 0.1;
    }
    protien = weight_pounds;
    fats = weight_pounds / 2;
    carbs_calorie = calorie - (protien * 4 + fats * 9);
    carbs = carbs_calorie / 4;
  }

  // console.log(age)
  // console.log(protien)
  // console.log(fats)
  // console.log(carbs_calorie)
  // console.log(carbs)

  return { calorie, protien, fats, carbs };
}

const step1Schema = yup.object().shape({
  full_name: yup.string().min(3).max(32).required(),
  email: yup.string().min(3).required().email(),
  password: yup.string().min(8).required(),
  gender: yup.string().required("An option is required").nullable(),
  dob: yup.string().required(),
});

const step2Schema = yup.object().shape({
  weight: yup.number().positive().required().nullable(),
  feet: yup
    .number()
    .typeError("feet is required")
    .min(3)
    .max(10)
    .positive()
    .required()
    .nullable(),
  inches: yup
    .number()
    .typeError("inches are required")
    .min(0)
    .max(11)
    .positive()
    .required()
    .nullable(),
  activity_level: yup.string().required("An option is required").nullable(),
});

const step3Schema = yup.object().shape({
  weight_goal: yup.string().required("An option is required").nullable(),
});

const step4Schema = yup.object().shape({
  weekly_goal: yup.number().required("An option is required").nullable(),
});

const UserRegister = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const navigate = useNavigate();
  const [goalText, setGoalText] = useState("");
  const [selectedClass, setSelectedClass] = useState("selected");
  const [customerDetails, setCustomerDetails] = useState({
    user_id: {
      full_name: "",
      email: "",
      password: "",
      user_type: "customer",
    },
    gender: "",
    height: "",
    weight: 0,
    activity_level: "",
    weight_goal: "",
    weekly_goal: 2,
    dob: "",
    calorie_goal: "2000",

    protein: 2,
    carbs: 3,
    fats: 4,
  });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(customerSchema),
  // });

  const {
    register: controlStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
  } = useForm({
    resolver: yupResolver(step1Schema),
  });
  const {
    register: controlStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
  } = useForm({
    resolver: yupResolver(step2Schema),
  });
  const {
    register: controlStep3,
    handleSubmit: handleSubmitStep3,
    formState: { errors: errorsStep3 },
  } = useForm({
    resolver: yupResolver(step3Schema),
  });
  const {
    register: controlStep4,
    handleSubmit: handleSubmitStep4,
    formState: { errors: errorsStep4 },
  } = useForm({
    resolver: yupResolver(step4Schema),
  });

  const submitStep1Form = (data) => {
    console.log(data.gender);

    setCustomerDetails({ ...customerDetails, gender: data.gender });

    setStep1(false);
    setStep2(true);

    console.log("aaaaaaa");
  };
  const submitStep2Form = (data) => {
    console.log("aaaaaaa");

    const height = data.feet + "." + data.inches;
    console.log(height);
    setCustomerDetails({
      ...customerDetails,
      height: height,
      activity_level: data.activity_level,
    });
    console.log(customerDetails.height);

    setStep2(false);
    setStep3(true);
    console.log(data.dob);
    console.log("aaaaaaa");
  };

  const submitStep3Form = (data) => {
    console.log("aaaaaaa");

    setCustomerDetails({ ...customerDetails, weight_goal: data.weight_goal });
    console.log(data.weight_goal);
    if (data.weight_goal == "gain_weight") {
      setGoalText("Gain");
    }

    if (data.weight_goal == "lose_weight") {
      setGoalText("Lose");
    }
    setStep3(false);
    setStep4(true);
    console.log("aaaaaaa");
  };

  const submitStep4Form = (data) => {

    // calculation of bmr

    var calorieData = calculation(customerDetails, data.weekly_goal);
    console.log(calorieData);

    var calorieObject= customerDetails;
    calorieObject={
      ...calorieObject,
      weekly_goal: data.weekly_goal,
      protein: calorieData.protien,
      carbs: calorieData.carbs,
      fats: calorieData.fats,
      calorie_goal: calorieData.calorie
    }
    // setCustomerDetails({
    //   ...customerDetails,
    //   weekly_goal: data.weekly_goal,
    //   protein: calorieData.protien,
    //   carbs: calorieData.carbs,
    //   fats: calorieData.fats,
    //   calorie_goal: calorieData.calorie
    // });

    console.log(calorieObject);


    console.log("before request");
    userService
      .register_user(calorieObject)
      .then((data) => {
        console.log(data)
        // props.history.push("/login");
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_LEFT,
        })
      })
    console.log("after request");
  };

  return (
    <div className="page-container d-flex justify-content-center">
      {step1 ? (
        <div className="outer-box-step1 d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmitStep1(submitStep1Form)}
            className="d-flex flex-column align-items-center justify-content-center form-step1"
          >
            <h2 className="text-center mb-3">User Signup</h2>
            <div className="inner-box-step1 d-flex ">
              <div className="d-flex flex-column w-50 ">
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Your Name:</h3>
                  <input
                    type="text"
                    name="full_name"
                    value={customerDetails.user_id.full_name}
                    {...controlStep1("full_name")}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        user_id: {
                          ...customerDetails.user_id,
                          full_name: e.target.value,
                        },
                      });
                      console.log(customerDetails.user_id.full_name);
                    }}
                  />
                  <p>{errorsStep1.full_name?.message}</p>
                </div>
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Your DOB:</h3>
                  <input
                    type="date"
                    // placeholder="DD/MM/YYYY"
                    name="dob"
                    value={customerDetails.dob}
                    {...controlStep1("dob")}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        dob: e.target.value,
                      });
                    }}
                  />
                  <p>{errorsStep1.dob?.message}</p>
                </div>
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Your Gender:</h3>
                  <div className="d-flex justify-content-around radio-container">
                    <div className="radio w-25 d-flex ">
                      <input
                        name="gender"
                        type="radio"
                        value="male"
                        {...controlStep1("gender")}
                      />
                      <h4 className="m-2">Male</h4>
                    </div>
                    <div className="radio w-25 d-flex  ">
                      <input
                        name="gender"
                        type="radio"
                        value="female"
                        {...controlStep1("gender")}
                      />
                      <h4 className="m-2">Female</h4>
                    </div>
                    <p>{errorsStep1.gender?.message}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column w-50">
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Email:</h3>
                  <input
                    type="email"
                    name="email"
                    value={customerDetails.user_id.email}
                    {...controlStep1("email")}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        user_id: {
                          ...customerDetails.user_id,
                          email: e.target.value,
                        },
                      });
                      console.log(customerDetails.user_id.email);
                    }}
                  />
                  <p>{errorsStep1.email?.message}</p>
                </div>
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Password:</h3>
                  <input
                    type="password"
                    name="password"
                    value={customerDetails.user_id.password}
                    {...controlStep1("password")}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        user_id: {
                          ...customerDetails.user_id,
                          password: e.target.value,
                        },
                      });
                    }}
                  />
                  <p>{errorsStep1.password?.message}</p>
                </div>
              </div>
            </div>

            <div className="buttons-step1 d-flex justify-content-between mt-3">
              <Link className="step1-btn" to="/register">
                <Button>back</Button>
              </Link>

              <Button type="submit">next</Button>
            </div>
          </form>
        </div>
      ) : step2 ? (
        <div className="outer-box-step2 d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmitStep2(submitStep2Form)}
            className="d-flex flex-column align-items-center justify-content-center form-step1"
          >
            <h2 className="text-center mb-3">User Signup</h2>

            <div className="inner-box-step2 d-flex ">
              <div className="d-flex flex-column w-50  ">
                <div className="d-flex flex-column w-75">
                  <h3 className="p-4 pb-0">Your Current Weight:(Kgs)</h3>
                  <div className="d-flex justify-content-start">
                    <input
                      type="number"
                      placeholder="Weight"
                      value={customerDetails.weight}
                      {...controlStep2("weight")}
                      onChange={(e) => {
                        setCustomerDetails({
                          ...customerDetails,
                          weight: e.target.value,
                        });
                      }}
                    />

                    {/* <FormControl className="m-3 dropdown">
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem value="lbs">lbs</MenuItem>
                    <MenuItem value="kgs">kgs</MenuItem>
                    </Select>
                  </FormControl> */}
                  </div>
                  <p className="error">{errorsStep2.weight?.message}</p>
                </div>
                <div className="d-flex flex-column w-75">
                  <h3 className="p-4 pb-0">Your Current height:</h3>
                  <div className="d-flex justify-content-center">
                    <input
                      type="number"
                      placeholder="Feet"
                      {...controlStep2("feet")}
                    />

                    <input
                      type="number"
                      placeholder="Inches"
                      // value="0"
                      {...controlStep2("inches")}
                    />
                    {/* <FormControl className="m-3 dropdown">
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem value="feet">feet</MenuItem>
                    <MenuItem value="cms">cms</MenuItem>
                    </Select>
                  </FormControl> */}
                  </div>
                  <p className="error">{errorsStep2.feet?.message}</p>
                  <p className="error">{errorsStep2.inches?.message}</p>
                </div>
              </div>
              <div className="d-flex flex-column w-50">
                <div className="btn-group d-flex flex-column h-100 align-items-stretch">
                  <h3 className="p-4 pb-0">
                    What is your baseline activity level?:
                  </h3>

                  <div className="activity-btn d-flex ">
                    <input
                      type="radio"
                      name="activity_level"
                      value="1.2"
                      {...controlStep2("activity_level")}
                    />

                    <div className="d-flex flex-column w-75 ">
                      <h4>Not Very Active</h4>
                      <p>
                        Spend most of the day sitting ( e.g. bank teller, desk
                        job){" "}
                      </p>
                    </div>
                  </div>
                  <div className="activity-btn d-flex justify-content-between">
                    <input
                      type="radio"
                      name="activity_level"
                      value="1.375"
                      {...controlStep2("activity_level")}
                    />
                    <div className="d-flex flex-column w-75">
                      <h4>Lightly Active</h4>
                      <p>
                        Spend a good part of your day on your feet ( e.g.
                        teacher, salesperson )
                      </p>
                    </div>
                  </div>
                  <div className="activity-btn d-flex justify-content-between">
                    <input
                      type="radio"
                      name="activity_level"
                      value="1.55"
                      {...controlStep2("activity_level")}
                    />
                    <div className="d-flex flex-column w-75">
                      <h4>Active</h4>
                      <p>
                        {" "}
                        Spend a good part of your day doing some physical
                        activity ( e.g. food server, postal carrier )
                      </p>
                    </div>
                  </div>
                  <div className="activity-btn d-flex justify-content-between">
                    <input
                      type="radio"
                      name="activity_level"
                      value="1.725"
                      {...controlStep2("activity_level")}
                    />
                    <div className="d-flex flex-column w-75">
                      <h4>Very Active</h4>
                      <p>
                        Spend a good part of the day doing heavy physical
                        activity ( e.g. bike messenger, carpenter )
                      </p>
                    </div>
                  </div>
                  <p>{errorsStep2.activity_level?.message}</p>
                </div>
              </div>
            </div>

            <div className="buttons-step2 d-flex justify-content-between mt-3">
              <Button type="submit">back</Button>

              <Button type="submit">next</Button>
            </div>
          </form>
        </div>
      ) : step3 ? (
        <div className="outer-box-step3 d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmitStep3(submitStep3Form)}
            className="d-flex flex-column justify-content-center align-items-center w-100"
          >
            <h2 className="text-center mb-3">User Signup</h2>
            <div className="btn-group2 inner-box-step3 d-flex flex-column">
              <h3 className="text-center p-4 pb-0 w-100">
                What is your weight goal?
              </h3>

              <div className="activity-btn d-flex justify-content-between">
                <input
                  type="radio"
                  name="weight_goal"
                  value="lose_weight"
                  {...controlStep3("weight_goal")}
                />
                <div className="d-flex flex-column w-75">
                  <h4>Lose Weight</h4>
                </div>
              </div>

              <div className="activity-btn d-flex justify-content-between">
                <input
                  type="radio"
                  name="weight_goal"
                  value="gain_weight"
                  {...controlStep3("weight_goal")}
                />
                <div className="d-flex flex-column w-75">
                  <h4>Gain Weight</h4>
                </div>
              </div>
              <p>{errorsStep3.weight_goal?.message}</p>
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

              <Button type="submit">next</Button>
            </div>
          </form>
        </div>
      ) : step4 ? (
        <div className="outer-box-step4 d-flex flex-column justify-content-center align-items-center">
          <form
            onSubmit={handleSubmitStep4(submitStep4Form)}
            className="d-flex flex-column justify-content-center align-items-center w-100"
          >
            <h2 className="text-center mb-3">User Signup</h2>
            <div className="btn-group2 inner-box-step4 d-flex flex-column">
              <h3 className="text-center p-4 pb-0 w-100">
                What is your weekly goal?
              </h3>

              <div className="activity-btn2 d-flex justify-content-between">
                <input
                  type="radio"
                  name="weekly_goal"
                  value="0.5"
                  {...controlStep4("weekly_goal")}
                />
                <div className="d-flex flex-column w-75 ">
                  <h4>{goalText} 0.5 pounds per week (Recommended)</h4>
                </div>
              </div>
              <div className="activity-btn2 d-flex justify-content-between">
                <input
                  type="radio"
                  name="weekly_goal"
                  value="1"
                  {...controlStep4("weekly_goal")}
                />
                <div className="d-flex flex-column w-75">
                  <h4>{goalText} 1 pound per week</h4>
                </div>
              </div>
              <p>{errorsStep4.weekly_goal?.message}</p>
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

              <Button type="submit">Signup</Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default UserRegister;
