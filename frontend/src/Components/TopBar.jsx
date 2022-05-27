import React, { useState } from 'react'
import trainerService from '../services/TrainerService'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
const TopBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const notify = () => {
    // Calling toast method by passing string
    toast.success("Logout Success");
  };
  return (
    <header className="top-header">
      <nav className="navbar-top">
        <ul className="navbar-nav">
          <li>
            <a
              href="#"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <i class="bx bxs-user-circle"></i>
            </a>
          </li>
          {open && (
            <div className="dropdown-settings">
              <Link to="/user-profile">
                <a className="menu-item">Profile Settings</a>
              </Link>
              <Link to="/">
                <a className="menu-item">Change Password</a>
              </Link>
              <hr />
              <a
                href=""
                className="menu-item"
                onClick={() => {
                  notify();
                  trainerService.logout();
                  navigate("/login");
                }}
              >
                Log out
              </a>
            </div>
          )}
        </ul>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default TopBar;
