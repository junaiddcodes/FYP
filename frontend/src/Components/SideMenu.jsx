import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideMenu = () => {
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
          <NavLink to="/user-dashboard" activeClassName="active">
            <i class="bx bx-grid-alt">
              <span className="links_name">Dashbaord</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-profile" activeClassName="active">
            <i class="bx bxs-user">
              <span className="links_name">Profile</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/search-gym" activeClassName="active">
            <i class="bx bx-search">
              <span className="links_name">Gym</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/search-trainer" activeClassName="active">
            <i class="bx bx-search-alt">
              <span className="links_name">Trainer</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-plans" activeClassName="active">
            <i class="bx bx-calendar-check">
              <span className="links_name">My plans</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-membership" activeClassName="active">
            <i class="bx bx-calendar-check">
              <span className="links_name">My Membership</span>
            </i>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="">
            <i class="bx bx-history">
              <span className="links_name">History</span>
            </i>
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/Messenger" activeClassName="active">
            <i class="bx bx-chat">
              <span className="links_name">Chat</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/query" activeClassName="active">
            <i class="bx bx-question-mark">
              <span className="links_name">Query</span>
            </i>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/activity-plans">
            <i class="bx bx-run">
              <span className="links_name">Activity Plans</span>
            </i>
          </NavLink>
        </li> */}
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

export default SideMenu;
