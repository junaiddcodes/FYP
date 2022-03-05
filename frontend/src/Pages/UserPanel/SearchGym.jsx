import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SearchGym = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div className="page-container-user">
      <h2>Search Gym</h2>
      <div className="d-flex flex-row mt-4">
        <div className="search">
          <input type="text" placeholder="Search gym by name..." />

          <FaSearch className="search-icon" />
        </div>

        <Button className="search-btns">Search</Button>
      </div>
      {!filterOpen ? (
        <Button
          className="mt-3"
          onClick={() => {
            setFilterOpen(true);
          }}
        >
          + Filters
        </Button>
      ) : (
        <div className="d-flex align-items-center">
          <FormControl className="m-4 w-25 dropdown-modal">
            <InputLabel id="demo-simple-select-label">Select City</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value="lbs">Islamabad</MenuItem>
              <MenuItem value="kgs">Lahore</MenuItem>
              <MenuItem value="kgs">Karachi</MenuItem>
              <MenuItem value="kgs">Faisalabad</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="m-4 w-25 dropdown-modal">
            <InputLabel id="demo-simple-select-label">Gender Preference</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value="lbs">Male</MenuItem>
              <MenuItem value="kgs">Female</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Use your current location">
            <button className="location-btn">
              <MdMyLocation className="location-icon" />
            </button>
          </Tooltip>

          <ImCross
            className="m-3 close-icon"
            onClick={() => {
              setFilterOpen(false);
            }}
          />
        </div>
      )}

      <div className=" mt-5">
        <div className="gym-grid-container">
          <div className="gym-card grid-item">
            <img src="../../../images/dumbells.png" alt="" />
            <h4 className="m-2">Mister Hit Gym</h4>
            <div className="d-flex m-2 mb-0">
              <MdLocationPin className="" />
              <p>Johar Town, Lahore</p>
            </div>
          </div>
          <div className="gym-card grid-item">
            <img src="../../../images/dumbells.png" alt="" />
            <h4 className="m-2">Mister Hit Gym</h4>
            <div className="d-flex m-2 mb-0">
              <MdLocationPin className="" />
              <p>Johar Town, Lahore</p>
            </div>
          </div>
          <div className="gym-card grid-item">
            <img src="../../../images/dumbells.png" alt="" />
            <h4 className="m-2">Mister Hit Gym</h4>
            <div className="d-flex m-2 mb-0">
              <MdLocationPin className="" />
              <p>Johar Town, Lahore</p>
            </div>
          </div>
          <div
            className="gym-card grid-item"
            onClick={() => {
              console.log("gym description");
            }}
          >
            <img src="../../../images/dumbells.png" alt="" />
            <h4 className="m-2">Mister Hit Gym</h4>
            <div className="d-flex m-2 mb-0">
              <MdLocationPin className="" />
              <p>Johar Town, Lahore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchGym;
