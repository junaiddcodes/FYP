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
import SideMenuTrainer from "../../Components/SideMenuTrainer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";
import trainerService from "../../services/TrainerService";

const TrainerActivityPlans = () => {
  const navigate = useNavigate();
  const [allPlans, setAllPlans] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  var edit = true;
  var userId = "";
  const get_plans = () => {
    trainerService
      .get_plans(userId)
      .then((data) => {
        console.log(data);
        setAllPlans(data.crud);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      userId = userService.getLoggedInUser()._id;
      if (
        userService.getLoggedInUser().user_type == "customer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
    console.log(userId);
    get_plans();
  }, []);
  const page_refresh = () => {
    window.location.reload(true);
  };
  const handleEdit = (e) => {
    navigate("/trainer-create-plan", { state: { e, edit } });
  };
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenuTrainer />
      <h2>Activity Plans</h2>
      <Link to="/trainer-create-plan">
        <Button className="mt-3"> Create Plan</Button>
      </Link>
      {allPlans.length == 0 ? (
        <h2>No plans yet</h2>
      ) : (
        allPlans.map((e, index) => {
          return (
            <div className="mt-5 d-flex flex-row">
              <div className="activity-grid-container d-flex flex-row mb-4">
                <div className="activity-card grid-item p-3">
                  <div className="d-flex ">
                    <div className=" w-75"></div>
                    <div className="d-flex w-25 justify-content-around">
                      <Button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={(event) => {
                          handleEdit(e);
                        }}
                      >
                        Edit
                      </Button>
                      <a
                        className="delete-icon m-1"
                        onClick={() => {
                          setConfirmDelete(true);
                        }}
                      >
                        <ImCross />
                      </a>
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
                            <h3>Are you sure you want to delete the plan?</h3>
                            <p>Select yes to delete the plan</p>
                          </div>
                          <div className="d-flex">
                            <Button
                              className="btn-dark m-3"
                              type="submit "
                              onClick={() => {
                                trainerService.delete_plan(e._id).then(() => {
                                  console.log("plan is Deleted");
                                });
                                page_refresh();

                                setConfirmDelete(false);
                              }}
                            >
                              Yes
                            </Button>
                            <Button
                              className="m-3"
                              type="submit"
                              onClick={() => {
                                setConfirmDelete(false);
                              }}
                            >
                              No
                            </Button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <div></div>
                  </div>

                  <h4 className="mt-2">{e.plan_title} plan</h4>
                  <h4>Description:</h4>
                  <p>{e.plan_desc}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>Duration:</h4>
                      <p>{e.plan_duration} weeks</p>
                    </div>
                    <div>
                      <h4>Price:</h4>
                      <p>{e.plan_price} PKR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TrainerActivityPlans;
