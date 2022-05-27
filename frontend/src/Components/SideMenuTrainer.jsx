import React from 'react'
import { NavLink } from 'react-router-dom'

const SideMenuTrainer = () => {
  return (
    <div className="sidebar">
      <div className="logo-content">
        <Link to="/user-dashboard">
          <div className="logo">
            <i class="bx bx-dumbbell"></i>
            <div className="logo-name">Fit</div>
          </div>{' '}
        </Link>
      </div>
      <ul className="nav_list">
        <li>
          <NavLink to="/trainer-dashboard" activeClassName="active">
            <i class="bx bxs-home-circle">
              <span className="links_name">Home</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/trainer-profile" activeClassName="active">
            <i class="bx bxs-user">
              <span className="links_name">Profile</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/trainer-activity-plans" activeClassName="active">
            <i class="bx bx-run">
              <span className="links_name">Activity plans</span>
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
          <NavLink to="/query" activeClassName="active">
            <i class="bx bx-question-mark">
              <span className="links_name">Query</span>
            </i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Messenger" activeClassName="active">
            <i class="bx bx-chat">
              <span className="links_name">Chat</span>
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
  )
}

export default SideMenuTrainer
