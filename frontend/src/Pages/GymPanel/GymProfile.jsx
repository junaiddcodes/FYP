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

const GymProfile = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [isGymForm, setIsGymForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="page-container-gym">
      <h2>Gym Profile</h2>
      {!isProfile ? (
        !isGymForm ? (
          <div className="gym-box mt-3 d-flex flex-column justify-content-start">
            <h4>There is no profile present. Click below to create a gym profile:</h4>
            <Button
              className="w-25 mt-4"
              onClick={() => {
                setIsGymForm(true);
              }}
            >
              Create Profile
            </Button>
          </div>
        ) : (
          <div className="gym-box mt-3 d-flex flex-column align-items-left">
            <form className="d-flex flex-column">
              <div className="input-text d-flex flex-column">
                <label for="fname">Enter Gym Name</label>
                <input type="text" id="" name="" value="" />
                <label for="lname">Gym Location</label>
                <input type="text" id="" name="" value="" />
                <label for="lname">Gym Contact Number</label>
                <input type="text" id="" name="" value="" />
                <label for="lname">Gym Business Email</label>
                <input type="text" id="" name="" value="" />
                <label for="lname">Gym Membership Price</label>
                <input type="Number" id="" name="" value="" />
                <label for="lname">Gender Facilitation</label>
              </div>
              <div className="d-flex mt-2 gender-radio justify-content-start">
                <input type="radio" value="Male" />
                <h4>Male</h4>
                <input type="radio" value="Female" />
                <h4>Female</h4>
                <input type="radio" value="Both" />
                <h4>Both</h4>
              </div>

              <label for="lname">Gym Description</label>

              <textarea className="text-field mt-2" />

              <label for="lname">Gym Picture</label>
              <p>Please upload your gym's picture</p>
              <input type="file" />
              <p className="mt-3">
                Submit Profile to the Admin. Admin will review your profile and Approve it:
              </p>
              <Button
                type="submit"
                className="w-25"
                onClick={() => {
                  setIsProfile(true);
                }}
              >
                Submit
              </Button>
            </form>
          </div>
        )
      ) : (
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Gym Name</th>
                    <th>Status</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mister Fit Gym</td>
                    <td>Approved</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button className="btn btn-warning edit-btn">Edit </Button>

                        <a
                          className="delete-icon"
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
                              <h3>Are you sure you want to delete the profile?</h3>
                              <p>Select yes to delete the item</p>
                            </div>
                            <div className="d-flex">
                              <Button className="btn-dark m-3" type="submit ">
                                Yes
                              </Button>
                              <Button className="m-3" type="submit ">
                                No
                              </Button>
                            </div>
                          </Modal>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymProfile;
