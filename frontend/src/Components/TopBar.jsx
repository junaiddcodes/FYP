import React, { useState } from "react";

const TopBar = () => {
  const [open, setOpen] = useState(false);
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
              <a href="" className="menu-item">
                Profile Settings
              </a>
              <a href="" className="menu-item">
                Help and support
              </a>
              <hr />
              <a href="" className="menu-item">
                Log out
              </a>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default TopBar;
