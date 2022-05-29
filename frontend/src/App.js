import React from "react";
import { Route, Routes, Redirect, BrowserRouter } from "react-router-dom";

import "./styles/pages.css";
import "./styles/extra.css";
import Register from "./Pages/Register/Register";
import UserRegister from "./Pages/Register/UserRegister";
import TrainerRegister from "./Pages/Register/TrainerRegister";
import GymRegister from "./Pages/Register/GymRegister";
import SideMenu from "./Components/SideMenu";
import UserDashboard from "./Pages/UserPanel/UserDashboard";
import TopBar from "./Components/TopBar";
import AddFood from "./Pages/UserPanel/AddFood";
import AddExercise from "./Pages/UserPanel/AddExercise";
import AddWater from "./Pages/UserPanel/AddWater";
import SearchGym from "./Pages/UserPanel/SearchGym";
import GymDescription from "./Pages/UserPanel/GymDescription";
import SearchTrainer from "./Pages/UserPanel/SearchTrainer";
import TrainerDescription from "./Pages/UserPanel/TrainerDescription";
import ActivityPlans from "./Pages/UserPanel/ActivityPlans";
import MyPlans from "./Pages/UserPanel/MyPlans";
import GymProfile from "./Pages/GymPanel/GymProfile";
import AdminDashboard from "./Pages/AdminPanel/AdminDashboard";
import GymRequest from "./Pages/AdminPanel/GymRequest";
import TrainerRequest from "./Pages/AdminPanel/TrainerRequest";
import QueryDetails from "./Pages/AdminPanel/QueryDetails";
import QueryDetailsUser from "./Pages/QueryDetailsUser";
import PaymentRequest from "./Pages/AdminPanel/PaymentRequest";
import TrainerDashboard from "./Pages/TrainerPanel/TrainerDashboard";
import TrainerProfile from "./Pages/TrainerPanel/TrainerProfile";
import TrainerActivityPlans from "./Pages/TrainerPanel/TrainerActivityPlans";
import CreatePlan from "./Pages/TrainerPanel/CreatePlan";
import Login from "./Pages/Register/Login";
import LoginAdmin from "./Pages/Register/LoginAdmin";
import CreateQuery from "./Pages/CreateQuery";
import Messenger from "./Messenger/Messenger";
import Home from "./Pages/HomePanel/home";
import ActivityPlanDetails from "./Pages/UserPanel/ActivityPlanDetails";
import UserProfile from "./Pages/UserPanel/UserProfile";
import GymViewMap from "./Pages/UserPanel/GymViewMap";
import ChangePassword from "./Components/ChangePassword";
import MyPlanDetails from "./Pages/UserPanel/MyPlanDetails";
function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <TopBar /> */}
        {/* <SideMenu /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-add-food" element={<AddFood />} />
          <Route path="/nearby-gyms" element={<GymViewMap />} />
          <Route path="/user-add-exercise" element={<AddExercise />} />
          <Route path="/user-add-water" element={<AddWater />} />
          <Route path="/search-gym" element={<SearchGym />} />
          <Route path="/search-trainer" element={<SearchTrainer />} />
          <Route path="/gym-description/:id" element={<GymDescription />} />
          <Route path="/gym-dashboard" element={<GymProfile />} />
          <Route path="/trainer-profile" element={<TrainerProfile />} />
          <Route path="/trainer-description/:id" element={<TrainerDescription />} />
          <Route path="/activity-plans" element={<ActivityPlans />} />
          <Route path="/trainer-activity-plans" element={<TrainerActivityPlans />} />
          <Route path="/trainer-create-plan" element={<CreatePlan />} />
          <Route path="/my-plans" element={<MyPlans />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="/admin-gym-request" element={<GymRequest />} />
          <Route path="/admin-trainer-request" element={<TrainerRequest />} />
          <Route path="/admin-query-details" element={<QueryDetails />} />
          <Route path="/user-query-details" element={<QueryDetailsUser />} />
          <Route path="/payment-request" element={<PaymentRequest />} />
          <Route path="/Messenger" element={<Messenger />} />
          <Route path="/query" element={<CreateQuery />} />
          <Route path="/activity-plan-details" element={<ActivityPlanDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/my-plan-details" element={<MyPlanDetails />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/register-user" element={<UserRegister />} />
          <Route path="/register-trainer" element={<TrainerRegister />} />
          <Route path="/register-gym" element={<GymRegister />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
