const { foodApiDetails } = require('../models/foodApi')

// //use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await foodApiDetails.find({})
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
//use to create data in db
const createData = async (req, res) => {
  try {
    const crud = await foodApiDetails.create(req.body)
    res.status(201).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// //use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { foodId: crudId } = req.params
    console.log(req.params)
    // console.log(foodId)
    // console.log(crudId)
    const crud = await foodApiDetails.findOne({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }

    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const getbyName = async (req, res) => {
  try {
    const { food: crudId } = req.params
    console.log(req.params)
    // console.log(foodId)
    // console.log(crudId)
    const crud = await foodApiDetails.findOne({ food_name: crudId })

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
    const { foodId: crudId } = req.params
    const crud = await foodApiDetails.findByIdAndUpdate(
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

// // delete data from id
const deleteData = async (req, res) => {
  try {
    const { foodId: crudId } = req.params
    const crud = await foodApiDetails.findByIdAndDelete({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
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
  getbyName,
}
