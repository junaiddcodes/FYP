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
  password: yup.string().min(8).max(20).required(),
  role: yup.string().required('A radio option is required').nullable(),
})

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))
  const notify = () => {
    // Calling toast method by passing string
    toast.info('Loading')
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
    console.log(data.role)
    notify()

    userService
      .login(email, password, data.role)
      .then((token) => {
        // console.log(token);
        if (data.role == 'customer') navigate('/user-dashboard')
        if (data.role == 'trainer') navigate('/trainer-dashboard')
        if (data.role == 'gym') navigate('/gym-dashboard')
      })
      .catch((err) => {
        console.log(err.toString())
        setAuthError('Email or password is not correct!')
      })
  }
  return (
    <div className="page-container d-flex justify-content-center">
      <div className="outer-box-login d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Sign in</h2>
        <div className="inner-box-login d-flex flex-column justify-content-around ">
          <form
            onSubmit={handleSubmit(submitForm)}
            className="d-flex flex-column"
          >
            <div className="input-text d-flex flex-column">
              <label>Email</label>
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                {...register('password')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <p>{errors.password?.message}</p>
              <label for="">Sign in as</label>
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
              Sign in{' '}
            </Button>
          </form>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <p className="signup-option text-light">
              Do not have an account? <Link to="/register">Signup here</Link>{' '}
            </p>
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <p className="signup-option text-light">
              Forget Password? <Link to="/forgottenpassword">Reset here</Link>{' '}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
