import React, { useState } from "react";
import moment from "moment";

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

function calculation(customerDetails, genderie, dob) {
  var feets = customerDetails.height / 12;
  var inch = customerDetails.height % 12;
  var height = (parseInt(feets) * 12 + parseInt(inch)) * 2.54;
  // var height = customerDetails.height / 0.032808;
  var weight = customerDetails.weight;
  var weight_pounds = weight * 2.205;
  var age = getAge(dob);
  var gender = genderie;
  var goal = customerDetails.weight_goal;
  var goal_speed = customerDetails.weekly_goal;
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
  full_name: yup
    .string()
    .min(3, "Name must be of at least 3 characters")
    .max(25, "Name must be of at most 25 characters")
    .required()
    .strict()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name "),

  email: yup
    .string()
    .min(7, "Email must be of at least 7 characters")
    .max(30, "Email must of at most 30 characters")
    .required()
    .email(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirm_password: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup.string().required("An option is required").nullable(),
  dob: yup
    .string()
    .required("DOB is Required")
    .test("DOB", "You must be more than 14 years old and less than 100 years old ", (value) => {
      return (
        moment().diff(moment(value), "years") >= 14 || moment().diff(moment(value), "years") < 100
      );
    }),
});

const step2Schema = yup.object().shape({
  weight: yup.number().typeError("weight cant be empty").positive().required().nullable(),
  feet: yup.number().typeError("feet is required").min(4).max(8).positive().required().nullable(),
  inches: yup
    .number()
    .typeError("inches are required")
    .min(0)
    .max(11)

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
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const navigate = useNavigate();
  const [goalText, setGoalText] = useState("");
  var calorieObject = "";
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
    const login_func = (customerDetails) => {
      userService
        .login(
          customerDetails.user_id.email,
          customerDetails.user_id.password,
          customerDetails.user_id.user_type
        )
        .then((token) => {
          // console.log(token);
          navigate("/user-dashboard");
        })
        .catch((err) => {
          console.log(err.toString());
          // setAuthError(`No ${data.role} account exists for this email!`);
        });
    };
    setCustomerDetails({
      ...customerDetails,
      user_id: {
        ...customerDetails.user_id,
        email: data.email,
        full_name: data.full_name,
        password: data.password,
      },
      gender: data.gender,
      dob: data.dob,
    });
    console.log("object after step 4 = ", customerDetails);
    // setCustomerDetails({ ...customerDetails, gender: data.gender });

    // setStep1(false);
    // setStep2(true);
    var calorieData = calculation(customerDetails, data.gender, data.dob);
    console.log(calorieData);

    calorieObject = customerDetails;
    calorieObject = {
      ...calorieObject,
      user_id: {
        email: data.email,
        full_name: data.full_name,
        user_type: "customer",
        password: data.password,
      },

      dob: data.dob,
      gender: data.gender,
      protein: calorieData.protien,
      carbs: calorieData.carbs,
      fats: calorieData.fats,
      calorie_goal: calorieData.calorie,
    };
    userService
      .register_user(calorieObject)
      .then((data) => {
        console.log(data);
        // props.history.push("/login");
        // navigate("/login");
        login_func(calorieObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitStep2Form = (data) => {
    // const height = data.feet + "." + data.inches;
    const height = data.feet * 12 + data.inches;

    console.log(height);
    setCustomerDetails({
      weight: data.weight,
      height: height,
      activity_level: data.activity_level,
    });
    console.log("object after step 1 = ", customerDetails);

    setStep2(false);
    setStep3(true);
  };

  const submitStep3Form = (data) => {
    setCustomerDetails({ ...customerDetails, weight_goal: data.weight_goal });
    console.log(data.weight_goal);
    if (data.weight_goal == "gain_weight") {
      setGoalText("Gain");
    }

    if (data.weight_goal == "lose_weight") {
      setGoalText("Lose");
    }
    console.log("object after step 2 = ", customerDetails);
    setStep3(false);
    setStep4(true);
    console.log("aaaaaaa");
  };

  const submitStep4Form = (data) => {
    // calculation of bmr

    setCustomerDetails({
      ...customerDetails,
      weekly_goal: data.weekly_goal,
    });

    console.log("object after step 3 = ", customerDetails);
    setStep4(false);
    setStep1(true);
    // setCustomerDetails({
    //   ...customerDetails,
    //   weekly_goal: data.weekly_goal,
    //   protein: calorieData.protien,
    //   carbs: calorieData.carbs,
    //   fats: calorieData.fats,
    //   calorie_goal: calorieData.calorie
    // });

    console.log(calorieObject);
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
                    // value={customerDetails.user_id.full_name}
                    {...controlStep1("full_name")}
                    // onChange={(e) => {
                    //   setCustomerDetails({
                    //     ...customerDetails,
                    //     user_id: {
                    //       ...customerDetails.user_id,
                    //       full_name: e.target.value,
                    //     },
                    //   });
                    //   console.log(customerDetails.user_id.full_name);
                    // }}
                  />
                  <p>{errorsStep1.full_name?.message}</p>
                </div>
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Your DOB:</h3>
                  <input
                    className="date-input"
                    type="date"
                    min="1930-01-01"
                    max="2008-01-01"
                    placeholder="dd-mm-yyyy"
                    name="dob"
                    // value={customerDetails.dob}
                    {...controlStep1("dob")}
                    // onChange={(e) => {
                    //   setCustomerDetails({
                    //     ...customerDetails,
                    //     dob: e.target.value,
                    //   });
                    // }}
                  />
                  <p>{errorsStep1.dob?.message}</p>
                </div>
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Your Gender:</h3>
                  <div className="d-flex justify-content-around radio-container">
                    <div className="radio w-25 d-flex ">
                      <input name="gender" type="radio" value="male" {...controlStep1("gender")} />
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
                  </div>
                  <p>{errorsStep1.gender?.message}</p>
                </div>
              </div>
              <div className="d-flex flex-column w-50">
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Email:</h3>
                  <input
                    type="email"
                    name="email"
                    // value={customerDetails.user_id.email}
                    {...controlStep1("email")}
                    // onChange={(e) => {
                    //   setCustomerDetails({
                    //     ...customerDetails,
                    //     user_id: {
                    //       ...customerDetails.user_id,
                    //       email: e.target.value,
                    //     },
                    //   });
                    //   console.log(customerDetails.user_id.email);
                    // }}
                  />
                  <p>{errorsStep1.email?.message}</p>
                </div>
                <div className="d-flex flex-column">
                  <h3 className="p-4 pb-0">Password:</h3>
                  <input type="password" name="password" {...controlStep1("password")} />
                  <p>{errorsStep1.password?.message}</p>
                  <h3 className="p-4 pb-0">Confirm password:</h3>
                  <input
                    type="password"
                    name="confirm_password"
                    {...controlStep1("confirm_password")}
                  />
                  <p className="p-3">{errorsStep1.confirm_password?.message}</p>
                </div>
              </div>
            </div>

            <div className="buttons-step1 d-flex justify-content-between mt-3">
              {/* <Link className="step1-btn" to="/register"> */}
              <Button
                onClick={() => {
                  setStep4(true);
                  setStep1(false);
                }}
              >
                {" "}
                back
              </Button>
              {/* </Link> */}

              <Button type="submit">submit</Button>
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
                      max="200"
                      min="30"
                      type="number"
                      placeholder="Weight"
                      // value={customerDetails.weight}
                      {...controlStep2("weight")}
                      // onChange={(e) => {
                      //   setCustomerDetails({
                      //     // ...customerDetails,
                      //     weight: e.target.value,
                      //   });
                      // }}
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
                      min="4"
                      max="8"
                      {...controlStep2("feet")}
                    />

                    <input
                      type="number"
                      placeholder="Inches"
                      min="0"
                      max="11"
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
                  <h3 className="p-4 pb-0">What is your baseline activity level?:</h3>

                  <div className="activity-btn d-flex ">
                    <input
                      type="radio"
                      name="activity_level"
                      value="1.2"
                      {...controlStep2("activity_level")}
                    />

                    <div className="d-flex flex-column w-75 ">
                      <h4>Not Very Active</h4>
                      <p>Spend most of the day sitting ( e.g. bank teller, desk job) </p>
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
                        Spend a good part of your day on your feet ( e.g. teacher, salesperson )
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
                        Spend a good part of your day doing some physical activity ( e.g. food
                        server, postal carrier )
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
                        Spend a good part of the day doing heavy physical activity ( e.g. bike
                        messenger, carpenter )
                      </p>
                    </div>
                  </div>
                  <p>{errorsStep2.activity_level?.message}</p>
                </div>
              </div>
            </div>

            <div className="buttons-step2 d-flex justify-content-between mt-3">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                back
              </Button>

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
              <h3 className="text-center p-4 pb-0 w-100">What is your weight goal?</h3>

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
              <h3 className="text-center p-4 pb-0 w-100">What is your weekly goal?</h3>

              <div className="activity-btn2 d-flex justify-content-between">
                <input
                  type="radio"
                  name="weekly_goal"
                  value="0.5"
                  {...controlStep4("weekly_goal")}
                />
                <div className="d-flex flex-column w-75 ">
                  <h4>{goalText} 0.22 kgs per week (Recommended)</h4>
                </div>
              </div>
              <div className="activity-btn2 d-flex justify-content-between">
                <input type="radio" name="weekly_goal" value="1" {...controlStep4("weekly_goal")} />
                <div className="d-flex flex-column w-75">
                  <h4>{goalText} 0.45 kgs per week</h4>
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

              <Button type="submit">next</Button>
            </div>
          </form>
        </div>
      ) : null}
      {step4 && (
        <div className="reference">
          <h5 className="text-light">Reference</h5>
          <p>
            The weight steps are taken from
            <a href="https://steelfitusa.com/blogs/health-and-wellness/calculate-tdee">
              https://steelfitusa.com/blogs/health-and-wellness/calculate-tdee
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserRegister;
