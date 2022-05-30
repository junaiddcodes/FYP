import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/pages.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import userService from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import trainerService from '../../services/TrainerService'

const schema = yup.object().shape({
  Email: yup.string().email().required(),

  role: yup.string().required('A radio option is required').nullable(),
})

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [sentMsg, setSentMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))
  const notify = () => {
    // Calling toast method by passing string
    toast.info('Loading')
  }
  var passDetails = {
    email: '',
  }

  // const data = location.state.errorUser;
  // const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    trainerService.logout()
  }, [])

  const submitForm = (data) => {
    passDetails = {
      email: email,
    }
    console.log(passDetails)
    console.log(data.role)
    if (data.role == 'customer') {
      userService
        .reset_pass_user(passDetails)
        .then((res) => {
          console.log(res)
          setSentMsg('Email sent to your mail inbox')
        })
        .catch((err) => {
          console.log(err.toString())
          setAuthError('Email is not correct!')
        })
    }
    if (data.role == 'trainer') {
      userService
        .reset_pass_trainer(passDetails)
        .then((res) => {
          console.log(res)
          setSentMsg('Email sent to your mail inbox')
        })
        .catch((err) => {
          console.log(err.toString())
          setAuthError('Email is not correct!')
        })
    }
    if (data.role == 'gym') {
      userService
        .reset_pass_gym(passDetails)
        .then((res) => {
          console.log(res)
          setSentMsg('Email sent to your mail inbox')
        })
        .catch((err) => {
          console.log(err.toString())
          setAuthError('Email is not correct!')
        })
    }
  }
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-forgot d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Reset password</h2>
        <div className="inner-box-forgot d-flex flex-column justify-content-around ">
          <form
            onSubmit={handleSubmit(submitForm)}
            className="d-flex flex-column"
          >
            <div className="input-text d-flex flex-column">
              <label>Enter account email</label>
              <input
                type="email"
                name="Email"
                value={email}
                {...register('Email')}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <p>{errors.Email?.message}</p>

              <label for="">Reset password for</label>
            </div>
            <div className="d-flex mt-2 gender-radio justify-content-start">
              <input
                name="role"
                type="radio"
                value="customer"
                {...register('role')}
              />
              <h4>User</h4>
              <input
                name="role"
                type="radio"
                value="trainer"
                {...register('role')}
              />
              <h4>Trainer</h4>
              <input
                name="role"
                type="radio"
                value="gym"
                {...register('role')}
              />
              <h4>Gym owner</h4>
            </div>
            <p>{errors.role?.message}</p>
            <p className="m-2">{authError}</p>
            <Button type="submit" className="mt-3 w-25">
              Reset{' '}
            </Button>
            <p>{sentMsg}</p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ForgotPassword
