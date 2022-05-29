import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const statsSchema = yup.object().shape({
  weight: yup.number().positive().required().nullable(),
  feet: yup.number().typeError("feet is required").min(4).max(8).positive().required().nullable(),
  inches: yup.number().typeError("inches are required").min(0).max(11).required().nullable(),
});
function getDecimalPart(num) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split(".")[1];
  return Number(decimalStr);
}

const UserDashboard = () => {
  var [userData, setUserData] = useState({});
  var userId = userService.getLoggedInUser()._id;
  var [mealData, setMealData] = useState([]);
  const [bmi, setBmi] = useState(0);
  const [height, setHeight] = useState(0);
  var errorUser = "Login as a customer first!";
  const [excersiseData, setExcerciseData] = useState([]);
  const navigate = useNavigate();
  var [waterAmount, setWaterAmount] = useState(0);
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  var statsDetails = {
    user_id: {
      full_name: "",
      email: "",
      password: "",
      user_type: "customer",
    },

    weight: "",
    height: "",
  };
  const {
    register: controlStats,
    handleSubmit: handleSubmitStats,
    formState: { errors: errorsStats },
  } = useForm({
    resolver: yupResolver(statsSchema),
  });
  const submitStatsForm = (data) => {
    console.log("in function");
    const height = data.feet + "." + data.inches;
    statsDetails = {
      ...statsDetails,
      user_id: {
        full_name: userData.user_id.full_name,
        // listed: "",
        email: userData.user_id.email,
        password: userData.user_id.password,
      },
      weight: data.weight,
      height: height,
    };

    // console.log(userProfileDetails);
    console.log("before update");
    userService
      .update_user(statsDetails, userId)
      .then((data) => {
        console.log("stats updated");
        setEditModalOpen(false);
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var [currentCalorie, setCurrentCalorie] = useState({
    food_calories: 0,
    food_proteins: 0,
    food_carbs: 0,
    food_fats: 0,
  });
  const [currentBurn, setCurrentBurn] = useState({
    excercise_calories: 0,
    excercise_proteins: 0,
    excercise_carbs: 0,
    excercise_fats: 0,
  });

  const notify = () => {
    // Calling toast method by passing string
    toast.info("Water is less");
  };

  var waterIntake = {
    userId: "",
    amount_litres: 0,
    time_date: "",
  };

  function getWaterData() {
    userService
      .waterPage(userId)
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

  function getUserCalorie() {
    userService
      .getoneUser(userId)

      .then((data) => {
        setUserData(data.crud);
        setFeet(data.crud.height.toString().charAt(0));
        setInches(getDecimalPart(data.crud.height));
        calculate_bmi(data.crud.height, data.crud.weight);
        console.log("user data = ", data.crud);
      });
  }
  function getMealData() {
    userService.getMealData(userId).then((data) => {
      var calorieData = {
        food_calories: 0,
        food_proteins: 0,
        food_carbs: 0,
        food_fats: 0,
      };
      setMealData(data.crud);
      data.crud.map((e) => {
        calorieData.food_calories = calorieData.food_calories + e.food_calories;
        calorieData.food_fats = calorieData.food_fats + e.food_fats;
        calorieData.food_proteins = calorieData.food_proteins + e.food_proteins;
        calorieData.food_carbs = calorieData.food_carbs + e.food_carbs;
        // x=x+e.food_calories;
      });

      setCurrentCalorie(calorieData);
    });
  }
  function getExcerciseData() {
    var burnCalorie = {
      excercise_calories: 0,
      excercise_proteins: 0,
      excercise_carbs: 0,
      excercise_fats: 0,
    };
    userService
      .getExcerciseData(userId)
      .then((res) => {
        setExcerciseData(res.crud);
        res.crud.map((e) => {
          burnCalorie.excercise_calories = burnCalorie.excercise_calories + e.excercise_calories;
          burnCalorie.excercise_proteins = burnCalorie.excercise_proteins + e.excercise_proteins;
          burnCalorie.excercise_carbs = burnCalorie.excercise_carbs + e.excercise_carbs;
          burnCalorie.excercise_fats = burnCalorie.excercise_fats + e.excercise_fats;
        });
        setCurrentBurn(burnCalorie);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const calculate_bmi = (height, weight) => {
    var meterHeight = 73 * 0.0254;
    var sqHeight = meterHeight * meterHeight;
    var bmi = weight / sqHeight;
    console.log(weight / sqHeight);
    setBmi(bmi);
  };

  useEffect(() => {
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

    getUserCalorie();
    getMealData();
    getWaterData();
    getExcerciseData();
  }, []);

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />

      <h2 className="m-2">Today's Progress</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4 className="mt-1">Calories goal: {parseInt(userData.calorie_goal)}</h4>
              <h4 className="mt-1">Calories consumed from food: {currentCalorie.food_calories}</h4>
              <h4 className="mt-1">
                Calories yet to be consumed:
                <span> {parseInt(userData.calorie_goal) - currentCalorie.food_calories}</span>
              </h4>
              <h4 className="mt-1">
                Calories burnt by exercise: {Math.floor(currentBurn.excercise_calories)}
              </h4>
              <h4 className="mt-1">Water consumed: {parseInt(waterAmount)} litres</h4>
              <h4 className="mt-1">Your BMI: {Math.round(bmi * 100) / 100}</h4>
            </div>
            <div className="d-flex flex-column w-50 h-50">
              <div className="d-flex justify-content-around align-items-start">
                <Button
                  onClick={() => {
                    navigate("/user-add-food", {
                      state: { userData, currentBurn },
                    });
                  }}
                >
                  Add Food
                </Button>

                <Button
                  onClick={() => {
                    navigate("/user-add-exercise", {
                      state: { userData, currentCalorie },
                    });
                  }}
                >
                  Add Exercise
                </Button>

                <Link to="/user-add-water">
                  <Button>Add Water</Button>
                </Link>
              </div>
              <div className="m-4 w-50 h-50 d-flex flex-column">
                <h4 className="m-1">Your weight: {userData.weight} kgs</h4>
                <h4 className="m-1">
                  Your height: {userData.height?.toString().charAt(0)} '{" "}
                  {/* {getDecimalPart(getCustomer.height)}{" "} */}
                  {(userData.height + "").split(".")[1]}{" "}
                </h4>
                <Button
                  className="btn btn-warning btn-sm w-25"
                  onClick={() => {
                    setEditModalOpen(true);
                  }}
                >
                  edit
                </Button>
                <div className="modal-container">
                  <Modal
                    style={{
                      overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,

                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                      },
                      content: {
                        color: "white",
                        position: "absolute",
                        top: "40px",
                        left: "40px",
                        right: "40px",
                        bottom: "40px",
                        background: "rgba(0,30,60,1)",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "1rem",
                        outline: "none",
                        padding: "20px",
                      },
                    }}
                    className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                    isOpen={editModalOpen}
                    onRequestClose={() => {
                      setEditModalOpen(false);
                    }}
                  >
                    <div className="modal-inner w-75 py-3">
                      <a
                        onClick={() => {
                          setEditModalOpen(false);
                        }}
                      >
                        <i class="bx bx-x"></i>
                      </a>

                      <div className="mt-2">
                        <form
                          onSubmit={handleSubmitStats(submitStatsForm)}
                          className="d-flex flex-column"
                        >
                          <label>Enter your weight(In Kgs)</label>
                          <input
                            type="number"
                            id=""
                            max="200"
                            min="30"
                            name="weight"
                            {...controlStats("weight")}
                            defaultValue={userData.weight}
                          />
                          <div className="mt-5 d-flex flex-column w-50">
                            <label>Enter your height</label>

                            <div className="d-flex justify-content-between ">
                              <div className="d-flex flex-column w-100">
                                <label>feet</label>

                                <input
                                  className="w-75"
                                  defaultValue={feet}
                                  type="number"
                                  placeholder="Feet"
                                  min="4"
                                  max="8"
                                  {...controlStats("feet")}
                                />
                              </div>
                              <div className="d-flex flex-column w-100">
                                <label>inches</label>

                                <input
                                  className="w-75"
                                  type="number"
                                  defaultValue={inches}
                                  placeholder="Inches"
                                  min="0"
                                  max="11"
                                  // value="0"
                                  {...controlStats("inches")}
                                />
                              </div>
                              <p className="error">{errorsStats.feet?.message}</p>
                              <p className="error">{errorsStats.inches?.message}</p>
                            </div>
                          </div>
                          <Button className="w-25 mt-5" type="submit">
                            Update
                          </Button>
                        </form>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h3 className="text-light">Calorie Goal</h3>
                <div>
                  <h3 className="text-light">
                    {currentCalorie.food_calories -
                      Math.floor(currentBurn.excercise_calories) +
                      "/" +
                      Math.floor(userData.calorie_goal)}
                  </h3>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_calories * 100) / userData.calorie_goal)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Proteins (grams)</h4>
                <div>
                  <h4 className="text-light font-weight-bold">
                    {Math.floor(currentCalorie.food_proteins) + "/" + Math.floor(userData.protein)}
                  </h4>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_proteins * 100) / userData.protein)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Carbohydrates (grams)</h4>
                <div>
                  <h4 className="text-light">
                    {Math.floor(currentCalorie.food_carbs) + "/" + Math.floor(userData.carbs)}
                  </h4>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_carbs * 100) / userData.carbs)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Fats (grams)</h4>
                <div>
                  <h4 className="text-light">
                    {Math.floor(currentCalorie.food_fats) + "/" + Math.floor(userData.fats)}
                  </h4>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_fats * 100) / userData.fats)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Water Intake (litres) </h4>
                <div>
                  <h4 className="text-light">{waterAmount + "/" + 6} </h4>
                </div>
              </div>
              <Progress done={Math.floor((waterAmount * 100) / 6)} heading="Calorie Goal" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
