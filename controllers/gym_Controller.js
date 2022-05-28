const { gymDetails } = require('../models/gym_details')
var _ = require('lodash')

var bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const cloudinary = require('../utils/cloudinary')

//use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await gymDetails.find({ listed: 'listed' }).limit(9)
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//use to get all data from db
const gymNotListed = async (req, res) => {
  try {
    const crud = await gymDetails.find({ listed: 'not-listed' })
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
const checkUser = async (req, res) => {
  console.log(req.user)
  res.send('Working')
}

//Controller for login and create Token
const loginGym = async (req, res) => {
  let user = await gymDetails.findOne({
    'user_id.email': req.body.email,
  })
  if (!user) return res.status(400).send('Gym is not Registered')

  // Compare the hashed passwords

  let bodyPassword = req.body.password
  let userPassword = user.user_id.password
  let isvalid = await bcryptjs.compare(bodyPassword, userPassword)

  //Sign token

  let token = jwt.sign(
    {
      _id: user._id,
      email: user.user_id.email,
      full_name: user.user_id.full_name,
      user_type: user.user_id.user_type,
    },
    config.get('jwtPrivateKey')
  )

  //Request True

  if (!isvalid) return res.status(401).send('Password is Invalid')
  res.send(token)
}
//use to create data in db
const createData = async (req, res) => {
  try {
    let user = await gymDetails.findOne({
      // user_id: { email: req.body.user_id.email },
      'user_id.email': req.body.user_id.email,
    })
    if (user) return res.status(400).send('Gym with given email already exist')
    const crud = await gymDetails.create(req.body)
    //Send Confirmation
    res.send(_.pick(crud, ['user_id.email', 'user_id.full_name']))
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { gymId: crudId } = req.params
    const crud = await gymDetails.findOne({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//this is use to update user in list
const updateData = async (req, res) => {
  try {
    const { gymId: crudId } = req.params
    const crud = await gymDetails.findByIdAndUpdate({ _id: crudId }, req.body, {
      new: true,
      runValidators: true,
    })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// delete data from id
const deleteData = async (req, res) => {
  try {
    const { gymId: crudId } = req.params
    const crud = await gymDetails.findByIdAndDelete({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Create Trainer Profile
const completeGym = async (req, res) => {
  try {
    const { gymId: crudId } = req.params

    var data = {
      listed: req.body.listed,
      location: req.body.location,
      gym_desc: req.body.gym_desc,
      gym_contact_no: req.body.gym_contact_no,
      gym_membership_price: req.body.gym_membership_price,
      gender_facilitation: req.body.gender_facilitation,
    }
    const crud = await gymDetails.findByIdAndUpdate({ _id: crudId }, data, {
      new: true,
      runValidators: true,
    })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Add profile Image
const gymImage = async (req, res) => {
  try {
    const { gymId: crudId } = req.params
    const gym_images = []
    const files = req.files

    for (const file of files) {
      const { path } = file

      const result = await cloudinary.uploader.upload(path, { folder: 'gym' })
      var data = {
        photo_url: result.secure_url,
        cloudinary_id: result.public_id,
      }
      gym_images.push(data)
    }

    var final_data = {
      gym_photos: gym_images,
    }

    const crud = await gymDetails.findByIdAndUpdate(
      { _id: crudId },
      final_data,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const gymSearchFilter = async (req, res) => {
  try {
    var query = {}

    Object.keys(req.body).forEach(function (key) {
      if (req.body[key]) {
        if (key == 'full_name') {
          query['user_id.full_name'] = new RegExp(req.body[key], 'i')
        } else if (key == 'city') {
          query['location.city'] = new RegExp(req.body[key], 'i')
        } else {
          query[key] = req.body[key]
        }
      }
    })

    if (req.body.full_name || req.body.city || req.body.gender_facilitation) {
      query.listed = 'listed'

      var crud = await gymDetails.find(query)
      if (crud.length == 0) {
        return res.status(404).json({ message: 'item does not exist' })
      }
    } else {
      return res.status(500).json({ message: 'Request is Empty' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
const forgetPassword = async (req, res) => {
  const { email } = req.body

  let user = gymDetails.findOne({ email }, (err, success) => {
    if (err || !user) {
      return res.status(400).send('user with given email not exist')
    }

    const token = jwt.sign(
      { _id: user._id },
      config.get('RESET_PASSWORD_KEY'),
      {
        expiresIn: '20m',
      }
    )
    const data = {
      from: 'hassan.awan231999@gmail.com',
      to: email,
      subject: 'account activation link',
      html: `
      <h2>Please click on the given link to reset your password</h2>
      <p>${config.get('CLIENT_URL')}restPassword/${token}<p>
      `,
    }
    return gymDetails.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: 'rest password link error' })
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json({
              error: err.message,
            })
          }
          return res.json({
            message: 'Email has been sent,kindly follow the instruction',
          })
        })
      }
    })
  })
}

const resetPassword = async (req, res) => {
  let temp
  const { resetLink, newPass } = req.body

  if (resetLink) {
    jwt.verify(
      resetLink,
      config.get('RESET_PASSWORD_KEY'),
      async function (error, DecodedData) {
        if (error) {
          return res.status(401).json({
            error: 'Incorrect token or it is expired',
          })
        }
        gymDetails.findOne({ resetLink }, async (err, user) => {
          if (err || !user) {
            return res.status(400).send('user with given token does not exits')
          }
          const obj = {
            password: newPass,
          }
          // console.log(user)
          // user = _.extend(user.user_id, obj)
          let salt = await bcryptjs.genSalt(10)
          var new_password = await bcryptjs.hash(newPass, salt)
          user.user_id.password = new_password
          user.resetLink = ''
          temp = user

          // user.save((err, result) => {
          //   console.log(user)
          //   if (err) {
          //     return res.status(400).json({ error: 'rest password error' })
          //   } else {
          //     return res.status(200).json({
          //       message: 'your password has been change',
          //     })
          //   }
          // })

          const crud = await gymDetails.findByIdAndUpdate(
            { _id: temp._id },
            temp,
            {
              new: true,
              runValidators: true,
            }
          )
          console.log(crud)

          if (crud) {
            return res.status(200).json({ message: 'password changed' })
          }
        })
      }
    )
  } else {
    return res.status(401).send('Authentication Error')
  }
}

module.exports = {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  loginGym,
  checkUser,
  completeGym,
  gymImage,
  gymNotListed,
  gymSearchFilter,
  forgetPassword,
  resetPassword,
}
