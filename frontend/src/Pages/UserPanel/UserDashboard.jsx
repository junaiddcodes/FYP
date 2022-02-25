import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
const UserDashboard = () => {
  return (
    <div className="page-container-user">
      <h2>Today's Progress</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained:</h4>
              <h4>Calories Burnt:</h4>
              <h4>Calorie Goal:</h4>
            </div>
            <div className="d-flex justify-content-around align-items-end w-50">
              <Link to="/user-add-food">
                <Button>Add Food</Button>
              </Link>
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
              <h4>Calorie Goal</h4>
              <Progress done="45" heading="Calorie Goal" />
            </div>
            <div>
              <h4>Carbohydrates</h4>
              <Progress done="60" heading="Calorie Goal" />
            </div>
            <div>
              <h4>Proteins</h4>
              <Progress done="70" heading="Calorie Goal" />
            </div>
            <div>
              <h4>Fats</h4>
              <Progress done="90" heading="Calorie Goal" />
            </div>
            <div>
              <h4>Water Intake</h4>
              <Progress done="10" heading="Calorie Goal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
