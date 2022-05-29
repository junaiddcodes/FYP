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

const changePassword = async (req, res) => {
  try {
    console.log(req.body)

    let user = await gymDetails.findOne({
      _id: req.body._id,
    })

    if (!user) {
      return res.status(404).json({ message: 'item does not exist' })
    } else {
      let bodyPassword = req.body.password
      let userPassword = user.user_id.password

      let isvalid = await bcryptjs.compare(bodyPassword, userPassword)

      if (!isvalid) {
        return res.status(401).json({ message: 'Current Password is invalid' })
      } else {
        console.log('Check Before')
        let salt = await bcryptjs.genSalt(10)
        var new_password = await bcryptjs.hash(req.body.new_password, salt)
        console.log('Check AFter')

        user.user_id.password = new_password

        var crud = await gymDetails.findByIdAndUpdate({ _id: user._id }, user, {
          new: true,
          runValidators: true,
        })
      }
    }
    res.status(200).json({ message: 'Password Change Successfully' })
  } catch (error) {
    res.status(500).json({ message: error })
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
  changePassword,
}
