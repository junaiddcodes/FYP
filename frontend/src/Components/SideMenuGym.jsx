import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideMenuGym = () => {
  return (
    <div className="sidebar">
      <div className="logo-content">
        <Link to="/user-dashboard">
          <div className="logo">
            <i class="bx bx-dumbbell"></i>
            <div className="logo-name">Fit</div>
          </div>{" "}
        </Link>
      </div>
      <ul className="nav_list">
        <li>
          <NavLink to="/gym-dashboard" activeClassName="active">
            <i class="bx bx-grid-alt">
              <span className="links_name">Dashbaord</span>
            </i>
          </NavLink>
        </li>

        <li>
          <NavLink to="/gym-profile" activeClassName="active">
            <i class="bx bxs-user">
              <span className="links_name">Profile</span>
            </i>
          </NavLink>
        </li>
      </ul>

      <div className="profile_content">
        <div className="profile">
          <div className="profile-details">
            <div className="name_job">
              <div className="name"></div>
              <div className="job"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenuGym;
