import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideMenuBack = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo-content">
        <div className="logo">
          <i class="bx bx-dumbbell"></i>
          <div className="logo-name">Fit</div>
        </div>{" "}
      </div>
      <ul className="nav_list">
        <li
          onClick={() => {
            navigate(-1);
          }}
        >
          <Link to="">
            <i class="bx bx-left-arrow-alt">
              <span className="links_name">Back</span>
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

export default SideMenuBack;
