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
import gymService from "../../services/GymService";
import { ClimbingBoxLoader, BarLoader, CircleLoader } from "react-spinners";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import pakCities from "../../Data/pakCities";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: blue;
`;
const SearchGym = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchedGyms, setSearchedGyms] = useState([]);
  const [searchResults, setSearchResults] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchGym, setSearchGym] = useState({
    full_name: "",
    city: "",
    gender_facilitation: "",
  });

  function getFeatureGyms() {
    gymService
      .get_all_gyms()
      .then((res) => {
        setSearchedGyms(res.crud);
        setIsSearched(false);
        console.log(res.crud);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSeacrhedGyms() {
    console.log(searchGym);
    gymService
      .get_search_gyms(searchGym)
      .then((res) => {
        setSearchedGyms(res.crud);
        setIsSearched(true);
        setSearchResults(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setSearchResults(true);
        setSearchedGyms([]);
      });
  }

  useEffect(() => {
    setLoading(true);
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");
      // console.log("log in first");
    }

    console.log(pakCities);

    getFeatureGyms();
  }, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Search Gym</h2>
      <div className="d-flex flex-row mt-4">
        <div className="search">
          <input
            type="text"
            placeholder="Search gym by name..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getSeacrhedGyms();
              }
            }}
            onChange={(e) => {
              setSearchGym({ ...searchGym, full_name: e.target.value });
            }}
          />

          <FaSearch className="search-icon" />
        </div>
        <div className="w-25 d-flex justify-content-around">
          <Button
            className="search-btns"
            onClick={() => {
              getSeacrhedGyms();
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
            <InputLabel id="demo-simple-select-label">Select City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => {
                setSearchGym({ ...searchGym, city: e.target.value });
              }}
            >
              {pakCities.map((e, key) => {
                return (
                  <MenuItem key={key} value={e.name}>
                    {e.name}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value="Islamabad">Islamabad</MenuItem>
              <MenuItem value="Lahore">Lahore</MenuItem>
              <MenuItem value="Karachi">Karachi</MenuItem>
              <MenuItem value="Chichawatni">Chichawatni</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl className="m-4 w-25 dropdown-modal">
            <InputLabel id="demo-simple-select-label">Gender Preference</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => {
                setSearchGym({
                  ...searchGym,
                  gender_facilitation: e.target.value,
                });
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Use your current location">
            <button
              className="location-btn"
              onClick={() => {
                navigate("/nearby-gyms");
              }}
            >
              <MdMyLocation className="location-icon" />
            </button>
          </Tooltip>

          <ImCross
            className="m-3 close-icon"
            onClick={() => {
              setFilterOpen(false);
              setSearchGym({
                ...searchGym,
                city: "",
                gender_facilitation: "",
              });
            }}
          />
        </div>
      )}
      <div className=" mt-5">
        {isSearched ? <h2>Searched Gyms</h2> : <h2>Featured Gyms</h2>}

        {loading ? <BarLoader loading={loading} color="#063be9" css={override} size={150} /> : null}
        <div className="gym-grid-container mt-3">
          {searchResults ? <p className="text-light w-100">Search Results not Found</p> : null}
          {searchedGyms.map((e, key) => {
            return (
              <div
                key={key}
                onClick={() => navigate("/gym-description/" + e._id)}
                className="gym-card grid-item"
              >
                <img src={e.gym_photos[0]?.photo_url} alt="" height="250" />
                <h4 className="m-1">{e.user_id.full_name}</h4>
                <h6 className="m-1">Membership price: {e.gym_membership_price} PKR</h6>
                {!e.numReviews ? (
                  <h6 className="m-1">No reviews yet</h6>
                ) : (
                  <h6 className="m-1">
                    <i class="mt-1 text-warning bx bxs-star"></i> {e.rating}{" "}
                    <span className="text-secondary">({e.numReviews})</span>{" "}
                  </h6>
                )}

                {/* <h6 className="m-1">
                  Rating: 4 <i class="mt-1 text-warning bx bxs-star"></i>
                </h6> */}
                <div className="d-flex m-2 mb-0">
                  <MdLocationPin className="" />
                  <p className="text-light" style={{ fontWeight: "bold" }}>
                    {e.location.city}
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

export default SearchGym;
