import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Progress from '../../Components/ProgressBar'
import TopBar from '../../Components/TopBar'
import SideMenu from '../../Components/SideMenu'
import userService from '../../services/UserService'

// console.log(userId)

const UserDashboard = () => {
  var [currentCalorie, setCurrentCalorie] =useState(0);
  var [currentProtein, setCurrentProtein] =useState(0);
  var [currentFats, setCurrentFats] =useState(0);
  var [currentCarbs, setCurrentCarbs] =useState(0);
  var [userData, setUserData] = useState({})
  var userId = userService.getLoggedInUser()._id
  function getUserCalorie() {
    userService
      .getoneUser(userId)

      .then((data) => {
        setUserData(data.crud)
        console.log(data.crud)
      })
  }
  useEffect(getUserCalorie, [])
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />

      <h2>Today's Progress</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained:{currentCalorie}</h4>
              <h4>Calories Burnt:</h4>
              <h4>Calorie Goal: {parseInt(userData.calorie_goal)}</h4>
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
              <Progress done={(currentCalorie*100)/userData.calorie_goal} heading="Calorie Goal" />
            </div>
            <div>
              <h4>Carbohydrates</h4>
              <Progress done={(currentCarbs*100)/userData.carbs} heading="Calorie Goal" />
            </div>
            <div>
              <h4>Proteins</h4>
              <Progress done={(currentProtein*100)/userData.protein} heading="Calorie Goal" />
            </div>
            <div>
              <h4>Fats</h4>
              <Progress done={(currentFats*100)/userData.fats} heading="Calorie Goal" />
            </div>
            <div>
              <h4>Water Intake</h4>
              <Progress done="10" heading="Calorie Goal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
