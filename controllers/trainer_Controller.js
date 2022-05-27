const { trainerDetails } = require('../models/trainerDetails')
const _ = require('lodash')
var bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const cloudinary = require('../utils/cloudinary')

//use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await trainerDetails.find({listed:"listed"}).limit(10)
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//use to get all data from db
const trainerNotListed = async (req, res) => {
  try {
    const crud = await trainerDetails.find({ listed: 'not-listed' })
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
//use to create data in db
const createData = async (req, res) => {
  try {
    let user = await trainerDetails.findOne({
      // user_id: { email: req.body.user_id.email },
      'user_id.email': req.body.user_id.email,
    })

    if (user) return res.status(400).send('user with given email already exist')

    const crud = await trainerDetails.create(req.body)
    res.send(_.pick(crud, ['user_id.email', 'user_id.full_name']))
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
const checkUser = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'trainer',
    })
    res.json(result)
  } catch (err) {
    console.log(err)
  }
  res.send('Working')
}

const loginUser = async (req, res) => {
  let user = await trainerDetails.findOne({
    'user_id.email': req.body.email,
  })
  if (!user) return res.status(400).send('user is not Registered')

  let bodyPassword = req.body.password
  let userPassword = user.user_id.password
  let isvalid = await bcryptjs.compare(bodyPassword, userPassword)

  let token = jwt.sign(
    {
      _id: user._id,
      email: user.user_id.email,
      full_name: user.user_id.full_name,
      user_type: user.user_id.user_type,
    },
    config.get('jwtPrivateKey')
  )

  if (!isvalid) return res.status(401).send('password is Invalid')
  res.send(token)
}

//use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { trainerId: crudId } = req.params
    const crud = await trainerDetails.findOne({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// //this is use to update user in list
const updateData = async (req, res) => {
  try {
    const { trainerId: crudId } = req.params
    const crud = await trainerDetails.findByIdAndUpdate(
      { _id: crudId },
      req.body,
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

// Create Trainer Profile
const completeTrainer = async (req, res) => {
  try {
    const { trainerId: crudId } = req.params
    console.log(req.body.exercise_type)

    var data = {
      listed: req.body.listed,
      exercise_type: req.body.exercise_type,
      company_name: req.body.company_name,
      designation: req.body.designation,
      time_worked: req.body.time_worked,
      trainer_desc: req.body.trainer_desc,
      trainer_availblity: req.body.trainer_availblity,
      qualification: req.body.qualification,
    }
    const crud = await trainerDetails.findByIdAndUpdate({ _id: crudId }, data, {
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
const trainerImage = async (req, res) => {
  try {
    const { trainerId: crudId } = req.params
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'trainer',
    })

    var data = {
      trainer_photo: result.secure_url,
      cloudinary_id: result.public_id,
    }
    const crud = await trainerDetails.findByIdAndUpdate({ _id: crudId }, data, {
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

// // delete data from id
const deleteData = async (req, res) => {
  try {
    const { trainerId: crudId } = req.params
    const crud = await trainerDetails.findByIdAndDelete({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// const trainerSearchFilter = async (req, res) => {
//   try {
//     var query = {};

//     Object.keys(req.body).forEach(function (key) {
//       if (req.body[key]) {
//         if (key == "full_name") {
//           query["user_id.full_name"] = req.body[key];
//         } else {
//           query[key] = req.body[key];
//         }
//       }
//     });

//     if (req.body.full_name || req.body.gender|| req.body.exercise_type) {
//       query.listed = "listed";

//       var crud = await trainerDetails.find(query);
//       if (crud.length == 0) {
//         return res.status(404).json({ message: "item does not exist" });
//       }
//     } else {
//       return res.status(500).json({ message: "Request is Empty" });
//     }

//     res.status(200).json({ crud });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

const trainerSearchFilter = async (req, res) => {
  try {
    var query = {}

    Object.keys(req.body).forEach(function (key) {
      if (req.body[key]) {
        if (key == 'full_name') {
          query['user_id.full_name'] = new RegExp(req.body[key], "i")
        } else {
          query[key] = req.body[key]
        }
      }
    })

    if (req.body.full_name || req.body.gender || req.body.exercise_type) {
      query.listed = 'listed'

      var crud = await trainerDetails.find(query)
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

module.exports = {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  loginUser,
  checkUser,
  completeTrainer,
  trainerImage,
  trainerNotListed,
  trainerSearchFilter,
}
