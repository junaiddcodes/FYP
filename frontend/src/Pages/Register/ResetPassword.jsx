import React, { useEffect, useState } from 'react'
import '../../styles/pages.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userService from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import trainerService from '../../services/TrainerService'
import gymService from '../../services/GymService'
import { useParams } from 'react-router-dom'

const changePassSchema = yup.object().shape({
  new_password: yup
    .string()
    // .min(8,"")
    .required('New password cant be empty')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
  // gender: yup.string().required("A radio option is required").nullable(),
})

const ResetPassword = () => {
  const tokenId = useParams()
  console.log('id', tokenId.id)
  console.log('token', tokenId.token)

  console.log('user_type', tokenId.user_type)
  const id = tokenId.id
  const token = tokenId.token
  const navigate = useNavigate()
  const [passwordError, setPasswordError] = useState('')
  const [newpasswordError, setNewPasswordError] = useState('')
  var userType = ''
  var passDetails = {
    password: '',
  }

  useEffect(() => {
    userType = tokenId.user_type
    // console.log(userType)
  })
  const {
    register: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(changePassSchema),
  })

  const submitPassForm = (data) => {
    passDetails = {
      password: data.new_password,
    }
    if (userType == 'customer') {
      userService
        .reset_user(id, token, passDetails)
        .then((res) => {
          console.log(res)
          setSentMsg('Password changed')
        })
        .catch((err) => {
          console.log(err.toString())
          setAuthError('Password not changed')
        })
    }
    if (userType == 'trainer') {
      userService
        .reset_trainer(id, token, passDetails)
        .then((res) => {
          console.log(res)
          setSentMsg('Password changed')
        })
        .catch((err) => {
          console.log(err.toString())
          setAuthError('Password not changed')
        })
    }
    if (userType == 'gym') {
      userService
        .reset_gym(id, token, passDetails)
        .then((res) => {
          console.log(res)
          setSentMsg('Password changed')
        })
        .catch((err) => {
          console.log(err.toString())

          setAuthError('Password not changed')
        })
    }
  }

  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-password d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={handleSubmitPassword(submitPassForm)}
          className="d-flex flex-column align-items-center justify-content-center form-step1 w-100 h-100"
        >
          <h2 className="text-center mb-3">Change Password</h2>
          <div className="inner-box-password d-flex flex-column">
            <div className="d-flex flex-column"></div>

            <p>{passwordError}</p>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">New password:</h3>
              <input
                type="password"
                name="new_password"
                {...controlPassword('new_password')}
                // onChange={(e) => {
                //   setPassDetails({
                //     ...passDetails,
                //     new_password: e.target.value,
                //   });
                // }}
              />
            </div>
            <p>{errorsPassword.new_password?.message}</p>
            <p>{newpasswordError}</p>
            <div className="d-flex flex-column">
              <h3 className="p-4 pb-0">Confirm new password:</h3>
              <input
                type="password"
                name="confirm_password"
                {...controlPassword('confirm_password')}
              />

              {/* <p>{errorsPassword.new_password?.message}</p> */}
              <p>{errorsPassword.confirm_password?.message}</p>
            </div>
          </div>

          <div className="btn-sm buttons-gym d-flex justify-content-between mt-3">
            <Button
              onClick={() => {
                navigate(-1)
              }}
            >
              back
            </Button>

            <Button className="btn-sm" type=" submit">
              Change password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
