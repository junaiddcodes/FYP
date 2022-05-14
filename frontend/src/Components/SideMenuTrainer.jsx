import React from "react";
import { Link } from "react-router-dom";

const SideMenuTrainer = () => {
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
          <Link to="/trainer-dashboard">
            <i class="bx bxs-home-circle">
              <span className="links_name">Home</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="/trainer-profile">
            <i class="bx bxs-user">
              <span className="links_name">Profile</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="/trainer-activity-plans">
            <i class="bx bx-run">
              <span className="links_name">Activity plans</span>
            </i>
          </Link>
        </li>
        <li>
          <Link to="">
            <i class="bx bx-history">
              <span className="links_name">History</span>
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

export default SideMenuTrainer;
