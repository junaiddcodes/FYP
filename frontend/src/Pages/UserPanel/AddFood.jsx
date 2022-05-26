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
import { useLocation } from "react-router-dom";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../Components/dropdown";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddFood = () => {
  const [foodCheck, setFoodCheck] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editMealId, setEditMealId] = useState(""); 
  const location = useLocation();
  var [currentCalorie, setCurrentCalorie] = useState({
    food_calories: 0,
    food_proteins: 0,
    food_carbs: 0,
    food_fats: 0,
  })

  const schema = yup.object().shape({
    meal_name: yup.string().required("Meal cannot be Empty"),
    food_quantity: yup.string().required("Food Weight cannot be Empty"),
  });
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  var user_id = userService.getLoggedInUser()._id;
  const [mealData, setMealData] = useState([]);
  const [userDetails, setUserDetails] = useState(location.state?.userData);
  const [calorieBurn, setCalorieBurn] = useState(location.state?.currentBurn);
  const [editData, setEditData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const updateForm = (data) => {
    if (!value) {
      setFoodCheck(false)
    } else {
      setFoodCheck(true)

      var mealPost = {
        customer_Id: user_id,
        meal_name: data.meal_name,
        food_id: value._id,
        food_name: value.food_name,
        food_weight: value.food_weight,
        food_calories: data.food_quantity * value.food_calories,
        food_proteins: data.food_quantity * value.food_proteins,
        food_carbs: data.food_quantity * value.food_carbs,
        food_fats: data.food_quantity * value.food_fats,
        food_quantity: data.food_quantity,
        time_date: new Date().getTime(),
      }
      notify()

      userService
        .editMealData(editMealId, mealPost)
        .then((e) => {
          setValue(null);
          getMealData();
          setEditModalOpen(false);
          console.log("Meal Update Successfully");
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function getSingleFood(id) {
    userService
      .get_single_food(id)
      .then((res) => {
        setValue(res.crud)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const submitForm = (data) => {
    if (!value) {
      setFoodCheck(false)
    } else {
      setFoodCheck(true)

      var mealPost = {
        customer_Id: user_id,
        meal_name: data.meal_name,
        food_id: value._id,
        food_name: value.food_name,
        food_weight: value.food_weight,
        food_calories: data.food_quantity * value.food_calories,
        food_proteins: data.food_quantity * value.food_proteins,
        food_carbs: data.food_quantity * value.food_carbs,
        food_fats: data.food_quantity * value.food_fats,
        food_quantity: data.food_quantity,
        time_date: new Date().getTime(),
      }
      Add()
      userService
        .createMeal(mealPost)
        .then((e) => {
          setValue(null);
          setModalOpen(false);
          getMealData();
          console.log("Meal Posted Successfully");
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };
  // function getMealData() {
  //   userService.getMealData(user_id).then((data) => {
  //     setMealData(data.crud);
  //   });
  // }

  function getMealData() {
    if (location.state) {
      userService.getMealData(userDetails._id).then((data) => {
        var calorieData = {
          food_calories: 0,
          food_proteins: 0,
          food_carbs: 0,
          food_fats: 0,
        }
        setMealData(data.crud)
        data.crud.map((e) => {
          calorieData.food_calories =
            calorieData.food_calories + e.food_calories
          calorieData.food_fats = calorieData.food_fats + e.food_fats
          calorieData.food_proteins =
            calorieData.food_proteins + e.food_proteins
          calorieData.food_carbs = calorieData.food_carbs + e.food_carbs
          // x=x+e.food_calories;
        })

        setCurrentCalorie(calorieData);
        console.log(calorieBurn)
      });
    }else{
      console.log("Empty State")
    }
  }

  function getFoodData(e) {
    if (e) {
      var foodSet = {
        food_name: e,
      }
      userService.getFood(foodSet).then((data) => {
        setFoodOptions(data.crud)
        setValue(null)
      })
    }
  }

  useEffect(() => {
    if (userService.isLoggedIn() == false) {
      navigate('/login')
    } else {
      if (
        userService.getLoggedInUser().user_type == 'trainer' ||
        userService.getLoggedInUser().user_type == 'gym' ||
        userService.getLoggedInUser().user_type == 'admin'
      ) {
        navigate('/login')
      }
    }
    getMealData()
  }, [])

  var [foodOptions, setFoodOptions] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Add Food</h2>

      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained: {currentCalorie?.food_calories}</h4>
              <h4>Calories Burnt:{Math.floor(calorieBurn.excercise_calories)}</h4>
              <h4>Calorie Goal: {Math.floor(userDetails?.calorie_goal)}</h4>
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
            setValue(null);
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
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              color: 'white',
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              background: 'rgba(0,30,60,1)',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '1rem',
              outline: 'none',
              padding: '20px',
            },
          }}
          className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
          isOpen={modalOpen}
          onRequestClose={() => {
            setModalOpen(false)
          }}
        >
          <div className="modal-inner w-75 d-flex flex-column">
            <a
              onClick={() => {
                setModalOpen(false)
              }}
            >
              <i class="bx bx-x"></i>
            </a>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="d-flex flex-column"
            >
              <FormControl className="w-100 dropdown-trainer mb-2">
                <InputLabel id="demo-simple-select-label-x">
                  Select Meal
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  placeholder="Select Meal"
                  id="demo-simple-select-2"
                  name="meal_name"
                  label="Select Meal"
                  {...register('meal_name')}
                >
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="lunch">Lunch</MenuItem>
                  <MenuItem value="snacks">Snacks</MenuItem>
                  <MenuItem value="dinner">Dinner</MenuItem>
                </Select>
              </FormControl>
              <p id="error-text" style={{ color: 'rgb(255, 34, 34)' }}>
                {errors.meal_name?.message}
              </p>

              <Dropdown
                className="w-100 "
                prompt="Select Food"
                value={value}
                onChange={setValue}
                options={foodOptions}
                label="food_name"
                getData={getFoodData}
              />
              {!foodCheck ? (
                <p id="error-text" style={{ color: 'rgb(255, 34, 34)' }}>
                  Food cannot be Empty
                </p>
              ) : null}

              <div className="mt-3 w-100">
                {value ? (
                  <p>
                    Enter the Quantity of meal per {value?.food_weight} grams
                  </p>
                ) : null}
                <TextField
                  id="demo-simple-select-2"
                  className="w-100"
                  label="Quantity"
                  variant="outlined"
                  name="food_quantity"
                  {...register('food_quantity')}
                  placeholder="Select Quantity"
                  InputLabelProps={{
                    style: { color: '#777' },
                  }}
                />
              </div>

              <p id="error-text" style={{ color: 'rgb(255, 34, 34)' }}>
                {errors.food_quantity?.message}
              </p>
              <div className="mb-3">
                <div>
                  <label htmlFor="time">Enter time of your meal</label>
                </div>
                <div>
                  <input
                    name="time"
                    className="time-input mb-1 py-3"
                    type="time"
                  />
                </div>
              </div>
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
                                setEditModalOpen(true)
                                setEditMealId(e._id)
                                setEditData(e)
                                getSingleFood(e.food_id)
                                console.log(e)
                              }}
                            >
                              Edit
                            </Button>
                            <div className="modal-container">
                              <Modal
                                style={{
                                  overlay: {
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,

                                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                  },
                                  content: {
                                    color: 'white',
                                    position: 'absolute',
                                    top: '40px',
                                    left: '40px',
                                    right: '40px',
                                    bottom: '40px',
                                    background: 'rgba(0,30,60,1)',
                                    overflow: 'auto',
                                    WebkitOverflowScrolling: 'touch',
                                    borderRadius: '1rem',
                                    outline: 'none',
                                    padding: '20px',
                                  },
                                }}
                                className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                                isOpen={editModalOpen}
                                onRequestClose={() => {
                                  setEditModalOpen(false)
                                }}
                              >
                                <div className="modal-inner w-75 py-3">
                                  <a
                                    onClick={() => {
                                      setEditModalOpen(false)
                                    }}
                                  >
                                    <i class="bx bx-x"></i>
                                  </a>

                                  <div className="mt-2">
                                    <form
                                      onSubmit={handleSubmit(updateForm)}
                                      className="d-flex flex-column"
                                    >
                                      <FormControl className="w-100 dropdown-trainer mb-2">
                                        <InputLabel id="demo-simple-select-label-x">
                                          Select Meal
                                        </InputLabel>
                                        <Select
                                          defaultValue={editData.meal_name}
                                          labelId="demo-simple-select-label"
                                          placeholder="Select Meal"
                                          id="demo-simple-select-2"
                                          name="meal_name"
                                          label="Select Meal"
                                          {...register('meal_name')}
                                        >
                                          <MenuItem value="breakfast">
                                            Breakfast
                                          </MenuItem>
                                          <MenuItem value="lunch">
                                            Lunch
                                          </MenuItem>
                                          <MenuItem value="snacks">
                                            Snacks
                                          </MenuItem>
                                          <MenuItem value="dinner">
                                            Dinner
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                      <p
                                        id="error-text"
                                        style={{ color: 'rgb(255, 34, 34)' }}
                                      >
                                        {errors.meal_name?.message}
                                      </p>

                                      <Dropdown
                                        className="w-100 "
                                        prompt="Selec Food"
                                        value={value}
                                        onChange={setValue}
                                        options={foodOptions}
                                        label="food_name"
                                        getData={getFoodData}
                                      />
                                      {!foodCheck ? (
                                        <p
                                          id="error-text"
                                          style={{
                                            color: 'rgb(255, 34, 34)',
                                          }}
                                        >
                                          Food cannot be Empty
                                        </p>
                                      ) : null}

                                      <div className="mt-3 w-100">
                                        {value ? (
                                          <p>
                                            Enter the Quantity of meal per{' '}
                                            {value?.food_weight} grams
                                          </p>
                                        ) : null}
                                        <TextField
                                          id="demo-simple-select-2"
                                          className="w-100"
                                          label="Quantity"
                                          variant="outlined"
                                          name="food_quantity"
                                          defaultValue={editData.food_quantity}
                                          {...register('food_quantity')}
                                          placeholder="Select Quantity"
                                          InputLabelProps={{
                                            style: { color: '#777' },
                                          }}
                                        />
                                      </div>

                                      <p
                                        id="error-text"
                                        style={{ color: 'rgb(255, 34, 34)' }}
                                      >
                                        {errors.food_quantity?.message}
                                      </p>
                                      <div className="mb-3">
                                        <div>
                                          <label htmlFor="time">
                                            Enter time of your meal
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            name="time"
                                            className="time-input mb-1 py-3"
                                            type="time"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <Button type="submit">Edit Food</Button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                            <a
                              className="delete-icon"
                              onClick={() => {
                                setConfirmDelete(true)
                              }}
                            >
                              <ImCross />
                            </a>
                            <div className="modal-container">
                              <Modal
                                style={{
                                  overlay: {
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,

                                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                  },
                                  content: {
                                    color: 'white',
                                    position: 'absolute',
                                    top: '40px',
                                    left: '40px',
                                    right: '40px',
                                    bottom: '40px',
                                    background: 'rgba(0,30,60,1)',
                                    overflow: 'auto',
                                    WebkitOverflowScrolling: 'touch',
                                    borderRadius: '1rem',
                                    outline: 'none',
                                    padding: '20px',
                                  },
                                }}
                                className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                                isOpen={confirmDelete}
                                onRequestClose={() => {
                                  setConfirmDelete(false)
                                }}
                              >
                                <div className="modal-inner w-75 d-flex flex-column">
                                  <a
                                    onClick={() => {
                                      setConfirmDelete(false)
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
                                      Delete()
                                      userService
                                        .deleteMealData(e._id)
                                        .then(() => {
                                          console.log('Meal is Deleted')
                                          getMealData()
                                        })

                                      setConfirmDelete(false)
                                    }}
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    className="m-3"
                                    type="submit"
                                    onClick={() => {
                                      setConfirmDelete(false)
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
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddFood
