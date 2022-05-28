import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SideMenuAdmin = () => {
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
          <NavLink to="/admin-dashboard" activeClassName="active">
            <i class="bx bxs-home-circle">
              <span className="NavLinks_name">Home</span>
            </i>
          </NavLink>
        </li>
        {/* <li>
          <a href="#gym-reqs">
            <i class="bx bx-dumbbell">
              <span className="NavLinks_name">Gym Profiles</span>
            </i>
          </a>
        </li>
        <li>
          <a href="#trainer-reqs">
            <i class="bx bxs-user">
              <span className="NavLinks_name">Trainer Profiles</span>
            </i>
          </a>
        </li>
        <li>
          <a href="#queries">
            <i class="bx bxs-message-rounded-dots">
              <span className="NavLinks_name">Queries</span>
            </i>
          </a>
        </li>
        <li>
          <a href="#payment">
            <i class="bx bxs-bank">
              <span className="NavLinks_name">Payment Reqs</span>
            </i>
          </a>
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
  )
}

export default SideMenuAdmin
