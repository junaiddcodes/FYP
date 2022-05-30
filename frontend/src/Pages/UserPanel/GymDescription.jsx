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
import { useParams } from "react-router-dom";
import gymService from "../../services/GymService";
import { Carousel } from "react-responsive-carousel";
import GymViewMap from "../../Components/mapShow/mapShow";
import { template } from "lodash";
import StripeContainer from "../../Components/Stripe/StripeContainer";

const GymDescription = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [pins, SetPins] = useState([31.4878, 74.3646]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showItem, setShowItem] = useState(true);
  var order = {
    user_id: "",
    gym_id: "",
  };
  const [orderX, SetOrderX] = useState({
    user_id: "",
    gym_id: "",
    price: 0,
    time_date: new Date().getTime(),
  });

  function handleBuyMembership(){
    console.log("Buy Membership")
    console.log(orderX)
    gymService.buy_gym_membership(orderX).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })

  }

  function checkGymOrder(){
    
  }

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
  const [gymDetails, setGymDetails] = useState({
    user_id: { full_name: "", email: "" },
    gym_membership_price: 0,
    gender_facilitation: "",
    gym_desc: "",
    gym_contact_no: "",
    location: {
      address: "",
      city: "",
      state: "",
    },
    gym_photos: [{ photo_url: "" }],
  });
  const gymId = useParams();
  function getGym() {
    gymService.get_one_gym(gymId.id).then((data) => {
      console.log("User ID", userService.getLoggedInUser()._id)
      SetOrderX({
        user_id: userService.getLoggedInUser()._id,
        gym_id: gymId.id,
        price: data.crud.gym_membership_price,
        time_date: new Date().getTime(),
      })
      setGymDetails(data.crud);
      console.log(data);
      var temp = [data.crud.cordinates.lat, data.crud.cordinates.long];
      console.log(temp);
      SetPins(temp);
    });
  }
  useEffect(getGym, []);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <Button
        className="m-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class="bx bx-arrow-back m-1"></i> Back
      </Button>
      <h2>Gym Description</h2>
      <div className="d-flex">
        <div className="gym-desc d-flex flex-column ">
          <div className="slider-div d-flex justify-content-center p-5">
            <Carousel width="100%">
              {gymDetails.gym_photos.length == 0 ? (
                <h2>No photos</h2>
              ) : (
                gymDetails.gym_photos.map((e, index) => {
                  return (
                    <div key={index}>
                      <img src={e.photo_url} height="200" />
                    </div>
                  );
                })
              )}
            </Carousel>
          </div>
          {/* <img src={gymDetails.gym_photos?.photo_url} alt="" /> */}
          <h4>{gymDetails.user_id.full_name}</h4>
          <h4>Membership Price:{gymDetails.gym_membership_price}</h4>
          <h4>Gender:{gymDetails.gender_facilitation}</h4>
          <p>{gymDetails.gym_desc}</p>
        </div>
        <div className="gym-contact d-flex flex-column ">
          <div>
            <div className="modal-container">
              <Modal
                style={{
                  overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  },
                  content: {
                    color: "white",
                    position: "absolute",
                    top: "40px",
                    left: "40px",
                    right: "40px",
                    bottom: "40px",
                    background: "rgba(0,30,60,1)",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "1rem",
                    outline: "none",
                    padding: "20px",
                  },
                }}
                className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                isOpen={confirmDelete}
                onRequestClose={() => {
                  setConfirmDelete(false);
                }}
              >
                <div className="modal-inner w-75 d-flex flex-column">
                  <a
                    onClick={() => {
                      setConfirmDelete(false);
                    }}
                  >
                    <i class="bx bx-x"></i>
                  </a>
                  <StripeContainer
                    amount={gymDetails.gym_membership_price}
                    action={handleBuyMembership}
                    description="Gym Membership Payment"
                  />
                </div>
              </Modal>
            </div>
            {showItem ? (
                      <Button className="w-50 m-3" onClick={() => setConfirmDelete(true)}>
                        Buy Membership
                      </Button>
                    ) : (
                      <p className="text-success">You are Member</p>
                    )}
          </div>
          <h4>Contact No.</h4>
          <p>{gymDetails.gym_contact_no}</p>
          <h4>Email</h4>
          <p>{gymDetails.user_id.email}</p>
          <h4>Location</h4>
          <p>{gymDetails.location.address + ", " + gymDetails.location.city}</p>
          <div className="mt-3 custom-map">
            <GymViewMap mapPin={pins} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDescription;
