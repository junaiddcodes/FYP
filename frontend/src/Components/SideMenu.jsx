import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="sidebar">
      <div className="logo-content">
        <div className="logo">
          <i class="bx bx-dumbbell"></i>
          <div className="logo-name">Fit</div>
        </div>{" "}
      </div>
      <ul className="nav_list">
        <li>
          <Link to="/user-dashboard">
            <i class="bx bx-grid-alt">
              <span className="links_name">Dashbaord</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="/user-profile">
            <i class="bx bxs-user">
              <span className="links_name">Profile</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="/search-gym">
            <i class="bx bx-search">
              <span className="links_name">Gym</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="/search-trainer">
            <i class="bx bx-search-alt">
              <span className="links_name">Trainer</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="/my-plans">
            <i class="bx bx-calendar-check">
              <span className="links_name">My plans</span>
            </i>
          </Link>
        </li>
        {/* <li>
          <Link to="">
            <i class="bx bx-history">
              <span className="links_name">History</span>
            </i>
          </Link>
        </li> */}
        <li>
          <Link to="/Messenger">
            <i class="bx bx-chat">
              <span className="links_name">Chat</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="/query">
            <i class="bx bx-question-mark">
              <span className="links_name">Query</span>
            </i>
          </Link>
        </li>
        {/* <li>
          <Link to="/activity-plans">
            <i class="bx bx-run">
              <span className="links_name">Activity Plans</span>
            </i>
          </Link>
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
