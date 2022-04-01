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
import { toast } from 'react-toastify'
import { getAccordionDetailsUtilityClass } from '@mui/material'

const AddWater = () => {
  const [modalOpen, setModalOpen] = useState(false)
  var [errorMessage, setErrorMessage] = useState('')

  var waterIntake = {
    user_id: '',
    amount_litres: 0,
    time_date: '',
  }
  const [isInitialRender, setIsInitialRender] = useState(true)
  const date = new Date().getTime()

  function waterValidationForm() {
    if (water.current.value < 0.1) {
      // console.log('value is invalid')
      setErrorMessage('value is invalid')
    } else {
      setErrorMessage('')
    }

    console.log(waterIntake)
    waterIntake = {
      ...waterIntake,
      amount_litres: water.current.value,
      user_id: userService.getLoggedInUser()._id,
      time_date: date,
    }
    console.log(waterIntake)
    // console.log("aaaaaaa");
    console.log('before request')
    userService.waterIntake(waterIntake)
    console.log('after request')
  }
  function getWaterData() {}
  const water = useRef(null)

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <h2>Add Water</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4 className="mt-2 mb-2">Water Taken (ltrs):</h4>
              <h4 className="mt-2">Water Goal (ltrs): </h4>
            </div>
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Water Taken</h2>
      </div>
      <div className="align-items-left">
        <input
          ref={water}
          className="input-modal"
          type="number"
          placeholder="Water in Ltrs"
          // onChange={(e) => {
          //   setWaterIntake({
          //     ...waterIntake,
          //     amount_litres: water.current.value,
          //     user_id: 'String',
          //     time_date: date,
          //   })
          // }}
        />
      </div>
      <Button className="mt-3" onClick={waterValidationForm}>
        + Add Water
      </Button>
      {errorMessage && (
        <p className="error" style={{ color: 'yellow' }}>
          {' '}
          {errorMessage}{' '}
        </p>
      )}
    </div>
  )
}

export default AddWater
