const { waterIntakeDetails } = require('../models/waterIntake')

//use to get all data from db
// const getAllData = async (req, res) => {
//   try {
//     const crud = await gymDetails.find({})
//     res.status(200).json({ crud })
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// }
//use to create data in db
const createData = async (req, res) => {
  try {
    const crud = await waterIntakeDetails.create(req.body)
    res.status(201).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

//use to get only one data from db
const getOneData = async (req, res) => {
  try {
    var getDate = new Date().getDate()
    var getMonth = new Date().getMonth()
    var getYear = new Date().getFullYear()

    getMonth += 1
    if (getMonth < 10) {
      getMonth = '0' + getMonth
    }
    if (getDate < 10) {
      getDate = '0' + getDate
    }

    var startDate = getYear + '-' + getMonth + '-' + (getDate)
    var endDate = getYear + '-' + getMonth + '-' + (parseInt(getDate)+1)
    console.log(startDate + ' and ' + endDate)

    const { waterId: crudId } = req.params
    const crud = await waterIntakeDetails.find({
      user_id: crudId,
      time_date: { $gt: new Date(startDate), $lt: new Date(endDate) },
    })

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
    const { waterId: crudId } = req.params
    const crud = await waterIntakeDetails.findByIdAndUpdate(
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

// delete data from id
const deleteData = async (req, res) => {
  try {
    const { waterId: crudId } = req.params
    const crud = await waterIntakeDetails.findByIdAndDelete({ _id: crudId })

    if (!crud) {
      return res.status(404).json({ message: 'item does not exist' })
    }
    res.status(200).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = {
  //   getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
}
