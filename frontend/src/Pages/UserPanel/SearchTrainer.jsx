import React, { useEffect, useState } from "react";
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
import userService from "../../services/UserService";
import trainerService from "../../services/TrainerService";

const SearchTrainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      if (
        userService.getLoggedInUser().user_type == "trainer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
  }, []);
  const [searchedTrainer, setSearchedTrainer] = useState([]);
  const [searchTrainer, setSearchTrainer] = useState({
    full_name: "",
    gender: "",
    exercise_type: "",
  });
  function getSeacrhedTrainers() {
    console.log(searchTrainer);
    trainerService
      .get_search_trainers(searchTrainer)
      .then((res) => {
        setSearchedTrainer(res.crud);
        setSearchResults(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchResults(true);
        setSearchedTrainer([]);
      });
  }

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Search Trainer</h2>
      <div className="d-flex flex-row mt-4">
        <div className="search">
          <input
            type="text"
            placeholder="Search trainer by name..."
            onChange={(e) => {
              setSearchTrainer({ ...searchTrainer, full_name: e.target.value });
            }}
          />

          <FaSearch className="search-icon" />
        </div>

        <div className="w-25 d-flex justify-content-around">
          <Button
            className="search-btns"
            onClick={() => {
              getSeacrhedTrainers();
            }}
          >
            Search
          </Button>
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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => {
                setSearchTrainer({ ...searchTrainer, gender: e.target.value });
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="trans">Trans</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="m-4 w-25 dropdown-modal">
            <InputLabel id="demo-simple-select-label">Select type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => {
                setSearchTrainer({
                  ...searchTrainer,
                  exercise_type: e.target.value,
                });
              }}
            >
              <MenuItem value="cardio">Cardio Trainer</MenuItem>
              <MenuItem value="gym">Gym Trainer</MenuItem>
              <MenuItem value="yoga">Yoga Trainer</MenuItem>
            </Select>
          </FormControl>

          <ImCross
            className="m-3 close-icon"
            onClick={() => {
              setFilterOpen(false);
              setSearchTrainer({
                ...searchTrainer,
                gender: "",
                exercise_type: "",
              });
            }}
          />
        </div>
      )}
      <div className=" mt-5">
        <div className="gym-grid-container">
          {searchResults ? <p className="text-light w-100">Search Results not Found</p> : null}
          {searchedTrainer.map((e, key) => {
            return (
              <div
                key={key}
                onClick={() => navigate("/trainer-description/" + e._id)}
                className="gym-card grid-item"
              >
                <img src={e.trainer_photo} alt="" height="250" />
                <h4 className="m-2">{e.user_id.full_name}</h4>
                <div className="d-flex m-2 mb-0">
                  <MdLocationPin className="" />
                  <p>{e.exercise_type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchTrainer;
