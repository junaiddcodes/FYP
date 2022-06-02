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
import { ClimbingBoxLoader, BarLoader, CircleLoader } from "react-spinners";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: blue;
`;

const SearchTrainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
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
    getFeaturedTrainer();
  }, []);
  const [searchedTrainer, setSearchedTrainer] = useState([]);
  const [searchTrainer, setSearchTrainer] = useState({
    full_name: "",
    gender: "",
    exercise_type: "",
  });

  function getFeaturedTrainer() {
    trainerService
      .get_all_trainer()
      .then((res) => {
        setSearchedTrainer(res.crud);
        setIsSearched(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSeacrhedTrainers() {
    console.log(searchTrainer);
    trainerService
      .get_search_trainers(searchTrainer)
      .then((res) => {
        setSearchedTrainer(res.crud);
        setIsSearched(true);
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getSeacrhedTrainers();
              }
            }}
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
              <MenuItem value="cardio">Cardio</MenuItem>
              <MenuItem value="gym">Gym</MenuItem>
              <MenuItem value="stretching">Stretching</MenuItem>
              <MenuItem value="boxing">boxing</MenuItem>
              <MenuItem value="aerobics">Aerobics</MenuItem>
              <MenuItem value="kickboxing">Kickboxing</MenuItem>
              <MenuItem value="swimming">Swimming</MenuItem>
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
        {isSearched ? <h2>Searched Trainers</h2> : <h2>Featured Trainers</h2>}
        <div className="w-100 h-100 d-flex justify-content-center">
          {loading ? (
            <BarLoader loading={loading} color="#063be9" css={override} size={150} />
          ) : null}
        </div>
        <div className="gym-grid-container pb-3">
          {searchResults ? <p className="text-light w-100">Search Results not Found</p> : null}
          {searchedTrainer.map((e, key) => {
            return (
              <div
                key={key}
                onClick={() => navigate("/trainer-description/" + e._id)}
                className="gym-card grid-item"
              >
                <img src={e.trainer_photo} alt="" height="250" />
                <h4 className="m-1">{e.user_id.full_name}</h4>
                <h6 className="m-1">Certification: {e.qualification}</h6>
                {!e.numReview ? (
                  <h6 className="m-1">No reviews yet</h6>
                ) : (
                  <h6 className="m-1">
                    Rating: {e.numReview} <i class="mt-1 text-warning bx bxs-star"></i>
                  </h6>
                )}
                <div className="d-flex m-1 mb-0">
                  <p className="text-light" style={{ fontWeight: "bold" }}>
                    Specializing in: {e.exercise_type}
                  </p>
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
