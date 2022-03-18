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

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import { useNavigate } from "react-router-dom";


const SearchTrainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);


  return (
    <div className="page-container-user">

  const navigate = useNavigate();
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />

      <h2>Search Trainer</h2>
      <div className="d-flex flex-row mt-4">
        <div className="search">
          <input type="text" placeholder="Search trainer by name..." />

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

        <div className="w-25 d-flex justify-content-around">
          <Button className="search-btns">Search</Button>
          <Button
            onClick={() => {
              setFilterOpen(true);
            }}
          >
            + Filters
          </Button>
        </div>
      </div>
      {filterOpen && (

        <div className="d-flex align-items-center">
          <FormControl className="m-4 w-25 dropdown-modal">
            <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value="lbs">Male</MenuItem>
              <MenuItem value="kgs">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="m-4 w-25 dropdown-modal">
            <InputLabel id="demo-simple-select-label">Select type</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value="lbs">Cardio Trainer</MenuItem>
              <MenuItem value="kgs">Gym Trainer</MenuItem>
              <MenuItem value="kgs">Yoga Trainer</MenuItem>
            </Select>
          </FormControl>

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

      <div className=" mt-5">
        <div className="gym-grid-container">
          <div onClick={() => navigate("/trainer-description")} className="gym-card grid-item">

            <img src="../../../images/trainer.png" alt="" />
            <h4 className="m-2">Hamza Kasim</h4>
            <div className="d-flex m-2 mb-0">
              <MdLocationPin className="" />
              <p>Johar Town, Lahore</p>
            </div>
          </div>


          <div className="gym-card grid-item">

          <div onClick={() => navigate("/trainer-description")} className="gym-card grid-item">

            <img src="../../../images/trainer.png" alt="" />
            <h4 className="m-2">Hamza Kasim</h4>
            <div className="d-flex m-2 mb-0">
              <MdLocationPin className="" />
              <p>Johar Town, Lahore</p>
            </div>
          </div>

          <div className="gym-card grid-item">

          <div onClick={() => navigate("/trainer-description")} className="gym-card grid-item">

            <img src="../../../images/trainer.png" alt="" />
            <h4 className="m-2">Hamza Kasim</h4>
            <div className="d-flex m-2 mb-0">
              <MdLocationPin className="" />
              <p>Johar Town, Lahore</p>
            </div>
          </div>

          <div className="gym-card grid-item">

          <div onClick={() => navigate("/trainer-description")} className="gym-card grid-item">

            <img src="../../../images/trainer.png" alt="" />
            <h4 className="m-2">Hamza Kasim</h4>
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

export default SearchTrainer;
