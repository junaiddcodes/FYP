import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";

import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../Components/dropdown";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";

const AddFood = () => {
  const [foodCheck, setFoodCheck] = useState(true);
  const schema = yup.object().shape({
    meal_name: yup.string().required("Meal cannot be Empty"),
    food_quantity: yup.string().required("Food Weight cannot be Empty"),
  });
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  var user_id = userService.getLoggedInUser()._id;
  var [mealData, setMealData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    if (!value) {
      setFoodCheck(false);
    } else {
      setFoodCheck(true);
      console.log(data);
      console.log(value);
      var mealPost = {
        customer_Id: user_id,
        meal_name: data.meal_name,
        food_name: value.food_name,
        food_weight: value.food_weight,
        food_calories: value.food_calories,
        food_proteins: value.food_proteins,
        food_carbs: value.food_carbs,
        food_fats: value.food_fats,
        food_quantity: data.food_quantity,
        time_date: new Date().getTime(),
      };

      userService
        .createMeal(mealPost)
        .then((e) => {
          getMealData();
          setValue(null)
          console.log("Meal Posted Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // userService
    //   .login(email, password, data.role)
    //   .then((token) => {
    //     // console.log(token);
    //     if (data.role == "customer") navigate("/user-dashboard");
    //     if (data.role == "trainer") navigate("/trainer-dashboard");
    //     if (data.role == "gym") navigate("/gym-dashboard");
    //   })
    //   .catch((err) => {
    //     console.log(err.toString());
    //     setAuthError(`No ${data.role} account exists for this email!`);
    //   });
  };
  function getMealData() {
    userService.getMealData(user_id).then((data) => {
      setMealData(data.crud);
      // console.log(mealData);
      console.log(data.crud.food_calories);
    });
  }

  
  function getFoodData(e) {
    console.log(e);
    if (e) {
      var x = e;
      if (x.length >= 3) {
        console.log(x);
        var foodSet = {
          food_name: x,
        };
        userService.getFood(foodSet).then((data) => {
          setFoodOptions(data.crud);
          setValue(null)
          console.log(foodOptions);
        });
      }
    }
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
    getMealData();
  }, []);

  var [foodOptions, setFoodOptions] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Add Food</h2>

      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained:</h4>
              <h4>Calories Burnt:</h4>
              <h4>Net Calories:</h4>
              <h4>Calorie Goal:</h4>
            </div>
            {/* <div className="d-flex justify-content-around align-items-end w-50">
              <Button>Add Food</Button>
              <Button>Add Exercise</Button>
              <Button>Add Water<c/Button>
            </div> */}
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Today's Meals</h2>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="m-3"
        >
          + Add Food
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
            <form
              onSubmit={handleSubmit(submitForm)}
              className="d-flex flex-column"
            >
              <FormControl className="w-100 dropdown-trainer">
                <InputLabel id="demo-simple-select-label-x">
                  Select Meal
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  placeholder="Select Meal"
                  id="demo-simple-select-2"
                  name="meal_name"
                  label="Select Meal"
                  {...register("meal_name")}
                >
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="lunch">Lunch</MenuItem>
                  <MenuItem value="snacks">Snacks</MenuItem>
                  <MenuItem value="dinner">Dinner</MenuItem>
                </Select>
              </FormControl>
              <p>{errors.meal_name?.message}</p>

              <Dropdown
                className="w-100"
                prompt="Select Food"
                value={value}
                onChange={setValue}
                options={foodOptions}
                label="food_name"
                getData={getFoodData}
              />
              {!foodCheck ? <p>Food cannot be Empty</p> : null}
              <div className="mt-2 w-100">
                <TextField
                  id="demo-simple-select-2"
                  className="w-100"
                  label="Quantity"
                  variant="outlined"
                  name="food_quantity"
                  {...register("food_quantity")}
                  placeholder="Select Quantity"
                  InputLabelProps={{
                    style: { color: "#777" },
                  }}
                />
              </div>

              <p>{errors.food_quantity?.message}</p>

              {/* // <Select
            //   className="select-drop"
            //   placeholder="Select Quantity"
            //   options={quantityOptions}
            // /> */}
              <div>
                <Button type="submit">Add Food</Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table">
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Calories Gained</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mealData.length == 0 ? (
                  <tr>
                    <td>There are no Meal for Today</td>
                  </tr>
                ) : (
                  mealData.map((e, index) => {
                    return (
                      <tr key={index}>
                        <td>{e.meal_name}</td>
                        <td>{e.food_name}</td>
                        <td>{e.food_quantity}</td>
                        <td>{e.food_calories}</td>
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
                                  <form
                                    onSubmit={handleSubmit(submitForm)}
                                    className="d-flex flex-column"
                                  >
                                    <FormControl className="w-100 dropdown-trainer">
                                      <InputLabel id="demo-simple-select-label-x">
                                        Select Meal
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        placeholder="Select Meal"
                                        id="demo-simple-select-2"
                                        name="meal_name"
                                        label="Select Meal"
                                        {...register("meal_name")}
                                      >
                                        <MenuItem value="breakfast">
                                          Breakfast
                                        </MenuItem>
                                        <MenuItem value="lunch">Lunch</MenuItem>
                                        <MenuItem value="snacks">
                                          Snacks
                                        </MenuItem>
                                        <MenuItem value="dinner">
                                          Dinner
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                    <p>{errors.meal_name?.message}</p>

                                    <Dropdown
                                      className="w-100"
                                      prompt="Select Food"
                                      value={value}
                                      onChange={setValue}
                                      options={foodOptions}
                                      label="food_name"
                                      getData={getFoodData}
                                    />
                                    {!foodCheck ? (
                                      <p>Food cannot be Empty</p>
                                    ) : null}
                                    <div className="mt-2 w-100">
                                      <TextField
                                        id="demo-simple-select-2"
                                        className="w-100"
                                        label="Quantity"
                                        variant="outlined"
                                        name="food_quantity"
                                        {...register("food_quantity")}
                                        placeholder="Select Quantity"
                                        InputLabelProps={{
                                          style: { color: "#777" },
                                        }}
                                      />
                                    </div>

                                    <p>{errors.food_quantity?.message}</p>

                              
                                    <div>
                                      <Button type="submit">Add Food</Button>
                                    </div>
                                  </form>
                                </div>
                                <div>
                                  <Button type="submit ">Add Food</Button>
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
                                  <h3>
                                    Are you sure you want to delete the food?
                                  </h3>
                                  <p>Select yes to delete the item</p>
                                </div>
                                <div className="d-flex">
                                  <Button
                                    className="btn-dark m-3"
                                    type="submit "
                                    onClick={() => {
                                      userService
                                        .deleteMealData(e._id)
                                        .then(() => {
                                          console.log("Meal is Deleted");
                                        });
                                      getMealData();
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
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
