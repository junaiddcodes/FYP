const { customerDetails } = require('../models/customerDetails')
var { Validate } = require('../models/customerDetails')

//Customer Register to the system

const registerCustomer = async (req, res) => {
  // let { error } = Validate(req.body)
  // if (error) return res.status(400).send(error.details[0].message)

  var customerData = new customerDetails({
    user_id: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.password,
      password: req.body.password,
      user_type: req.body.user_type,
    },
    gender: req.body.gender,
    weight: req.body.weight,
    height: req.body.height,
    activity_level: req.body.activity_level,
    weight_goal: req.body.weight_goal,
    weekly_goal: req.body.weekly_goal,
    dob: req.body.dob,
    calorie_goal: req.body.calorie_goal,
  })

  await customerData.save()

  return res.status(200).send(customerData)
}

//use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await customerDetails.find()
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// //use to create data in db
// const createData = async (req, res) => {
//   try {
//     const crud = await customerDetails.create(req.body)
//     res.status(201).json({ crud })
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// }

//use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { userId: crudId } = req.params
    const crud = await customerDetails.findOne({ _id: crudId })

    if (!crud) {
      return res.status(404).jason({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//this is use to update user in list
const updateData = async (req, res) => {
  try {
    const { userId: crudId } = req.params
    const crud = await customerDetails.findByIdAndUpdate(
      { _id: crudId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!crud) {
      return res, status(404).jason({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//delete data from id
const deleteData = async (req, res) => {
  try {
    const { userId: crudId } = req.params
    const crud = await customerDetails.findByIdAndDelete({ _id: crudId })

    if (!crud) {
      return res, status(404).jason({ message: 'item does not exist' })
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
  //   createData,
  registerCustomer,
}
