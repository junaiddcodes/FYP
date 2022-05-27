import React from 'react'
import { Link } from 'react-router-dom'

const SideMenuGym = () => {
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
          <Link to="/gym-dashboard">
            <i class="bx bxs-home-circle">
              <span className="links_name">Home</span>
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
  )
}

export default SideMenuGym
