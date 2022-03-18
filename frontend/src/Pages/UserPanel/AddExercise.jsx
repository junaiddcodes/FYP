import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";

const AddExercise = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Add Exercise</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained:</h4>
              <h4>Calories Burnt:</h4>
              <h4>Net Calories:</h4>

              <h4>Calorie Goal:</h4>
            </div>
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Today's Exercises</h2>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="m-3"
        >
          + Add Exercise
        </Button>
      </div>
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
          isOpen={modalOpen}
          onRequestClose={() => {
            setModalOpen(false);
          }}
        >
          <div className="modal-inner w-75 d-flex flex-column">
            <a
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <i class="bx bx-x"></i>
            </a>
            <FormControl className="m-3 w-100 dropdown-modal">
              <InputLabel id="demo-simple-select-label">Select Exercise Type</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                <MenuItem value="lbs">Cardio</MenuItem>
                <MenuItem value="kgs">Gym</MenuItem>
                <MenuItem value="kgs">Stretching</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="m-3 w-100 dropdown-modal">
              <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                <MenuItem value="lbs">Bench Press</MenuItem>
                <MenuItem value="kgs">Cycling</MenuItem>
              </Select>
            </FormControl>
            <input className="input-modal" type="number" placeholder="Enter Time (in minutes)" />
          </div>
          <div>
            <Button type="submit ">Add Exercise</Button>
          </div>
        </Modal>
      </div>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Exercise</th>
                  <th>Time (in minutes)</th>
                  <th>Calories Burnt</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cardio</td>
                  <td>Breath Control</td>
                  <td>20</td>
                  <td>300</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        className="btn btn-warning edit-btn"
                        onClick={() => {
                          setEditModalOpen(true);
                        }}
                      >
                        Edit{" "}
                      </Button>
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
                          isOpen={editModalOpen}
                          onRequestClose={() => {
                            setEditModalOpen(false);
                          }}
                        >
                          <div className="modal-inner w-75 d-flex flex-column">
                            <a
                              onClick={() => {
                                setEditModalOpen(false);
                              }}
                            >
                              <i class="bx bx-x"></i>
                            </a>
                            <FormControl className="m-3 w-100 dropdown-modal">
                              <InputLabel id="demo-simple-select-label">
                                Select Exercise Type
                              </InputLabel>
                              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value="lbs">Cardio</MenuItem>
                                <MenuItem value="kgs">Gym</MenuItem>
                                <MenuItem value="kgs">Stretching</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl className="m-3 w-100 dropdown-modal">
                              <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
                              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value="lbs">Bench Press</MenuItem>
                                <MenuItem value="kgs">Cycling</MenuItem>
                              </Select>
                            </FormControl>
                            <input
                              className="input-modal"
                              type="number"
                              placeholder="Enter Time (in minutes)"
                            />
                          </div>
                          <div>
                            <Button type="submit ">Add Exercise</Button>
                          </div>
                        </Modal>
                      </div>
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
                            <h3>Are you sure you want to delete the exercise?</h3>
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
                <tr>
                  <td>Cardio</td>
                  <td>Super Step</td>
                  <td>15</td>
                  <td>500</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Gym</td>
                  <td>Bench Press</td>
                  <td>30</td>
                  <td>800</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
