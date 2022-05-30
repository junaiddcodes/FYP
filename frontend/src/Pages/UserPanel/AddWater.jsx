import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-modal'
import { ImCross } from 'react-icons/im'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TopBar from '../../Components/TopBar'
import SideMenu from '../../Components/SideMenu'
import { func } from 'joi'
import userService from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import { getAccordionDetailsUtilityClass, TextField } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { min } from 'lodash'
// import { useNavigate } from "react-router-dom";

const AddWater = () => {
  var [errorMessage, setErrorMessage] = useState('')
  const [waterValue, setWaterValue] = useState()
  var [waterAmount, setWaterAmount] = useState()
  const [waterData, setWaterData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()
  const Edited = () => {
    // Calling toast method by passing string
    toast.success('Water Edit')
  }
  const Add = () => {
    // Calling toast method by passing string
    toast.success('Water Added')
  }
  const Delete = () => {
    // Calling toast method by passing string
    toast.success('Water Deleted')
  }

  const schema = yup.object().shape({
    water: yup
      .number()
      .min(0.1, 'Water cannot be less than 0.1 Ltrs')
      .max(6, 'Water cannot be less than 6 Ltrs at one time')
      .required('Water cannot be Empty'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  var user_id = userService.getLoggedInUser()._id

  var waterIntake = {
    user_id: '',
    amount_litres: 0,
    time_date: '',
  }

  function deleteWater(id) {
    userService.deleteWaterData(id).then((e) => {
      console.log('Water delete Successfully')
      setConfirmDelete(false)
    })
  }

  function getWaterData() {
    userService
      .waterPage(user_id)
      .then((data) => {
        setWaterData(data.crud)
        var waterIntake = data.crud.map((e) => {
          var data = 0
          data = data + e.amount_litres
          return data
        })

        // Getting sum of numbers
        var sumWater = waterIntake.reduce(function (a, b) {
          return a + b
        }, 0)

        setWaterAmount(sumWater)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function waterValidationForm(data) {
    waterIntake = {
      amount_litres: data.water,
      user_id: user_id,
      time_date: new Date().getTime(),
    }

    userService.waterIntake(waterIntake).then((e) => {
      Add()
      getWaterData()
      setModalOpen(false)
    })
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
    getWaterData()
  }, [])

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
      <h2>Add Water</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4 className="mt-2 mb-2">Water Taken (ltrs): {waterAmount}</h4>
              <h4 className="mt-2">Water Goal (ltrs): 6 </h4>
            </div>
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Today's Meals</h2>
        <Button
          onClick={() => {
            setModalOpen(true)
          }}
          className="m-3"
        >
          + Add Water
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
              onSubmit={handleSubmit(waterValidationForm)}
              className="d-flex flex-column"
            >
              <div className="mb-3">
                <TextField
                  id="demo-simple-select-2"
                  className="w-100"
                  label="Water"
                  variant="outlined"
                  name="water"
                  {...register('water')}
                  placeholder="Enter Water (in Liters)"
                  InputLabelProps={{
                    style: { color: '#777' },
                  }}
                />
              </div>
              <p id="error-text" style={{ color: 'rgb(255, 34, 34)' }}>
                {errors.water?.message}
              </p>
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
                  <th>Water Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {waterData.length == 0 ? (
                  <tr>
                    <td>There are no Meal for Today</td>
                  </tr>
                ) : (
                  waterData.map((e, index) => {
                    return (
                      <tr key={index}>
                        <td>{e.amount_litres} Liters</td>

                        <td>
                          <div className="d-flex align-items-center">
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
                                      deleteWater(e._id)
                                      Delete()
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

export default AddWater
