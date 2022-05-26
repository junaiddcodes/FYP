import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  var [waterAmount, setWaterAmount] = useState(0);

  var [currentCalorie, setCurrentCalorie] = useState({
    food_calories: 0,
    food_proteins: 0,
    food_carbs: 0,
    food_fats: 0,
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
  var [userData, setUserData] = useState({});
  var userId = userService.getLoggedInUser()._id;
  var [mealData, setMealData] = useState([]);
  const [bmi, setBmi] = useState(0);
  const [height, setHeight] = useState(0);
  var errorUser = "Login as a customer first!";

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

    // if (Math.floor((waterAmount * 100) / 6) <= 20) {
    //   notify();
    // }

    getUserCalorie();
    getMealData();
    getWaterData();
    const calculate_bmi = () => {
      setHeight(userData.height / 0.3048);
      setHeight(height * height);

      console.log(userData.weight);
      setBmi(height / userData.weight);

      console.log(bmi);
    };
    calculate_bmi();
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
              <h4> Calories Gained:{currentCalorie.food_calories}</h4>
              <h4>Calories Burnt:</h4>
              <h4>Calorie Goal: {parseInt(userData.calorie_goal)}</h4>
              <h4>Water Taken: {parseInt(waterAmount)}</h4>
              <h4>Your BMI: {bmi}</h4>
            </div>
            <div className="d-flex justify-content-around align-items-end w-50">
              <Button
                onClick={() => {
                  navigate("/user-add-food", { state: { userData } });
                }}
              >
                Add Food
              </Button>

              <Link to="/user-add-exercise">
                <Button>Add Exercise</Button>
              </Link>
              <Link to="/user-add-water">
                <Button>Add Water</Button>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-column mt-3">
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Calorie Goal</h4>
                <div>
                  <p className="text-light">
                    {currentCalorie.food_calories + "/" + Math.floor(userData.calorie_goal)}{" "}
                  </p>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_calories * 100) / userData.calorie_goal)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Carbohydrates</h4>
                <div>
                  <p className="text-light">
                    {currentCalorie.food_carbs + "/" + Math.floor(userData.carbs)}
                  </p>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_carbs * 100) / userData.carbs)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Proteins</h4>
                <div>
                  <p className="text-light">
                    {currentCalorie.food_proteins + "/" + Math.floor(userData.protein)}
                  </p>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_proteins * 100) / userData.protein)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Fats</h4>
                <div>
                  <p className="text-light">
                    {currentCalorie.food_fats + "/" + Math.floor(userData.fats)}
                  </p>
                </div>
              </div>
              <Progress
                done={Math.floor((currentCalorie.food_fats * 100) / userData.fats)}
                heading="Calorie Goal"
              />
            </div>
            <div>
              <div className="w-100 d-flex justify-content-between">
                <h4>Water Intake </h4>
                <div>
                  <p className="text-light">{waterAmount + "/" + 6}</p>
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
