var express = require('express')
var router = express.Router()

// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/meal')
var { Verify } = require('../../middleware/waterIntake')

const {
  //   getAllData,
  getOneData,
  updateData,
  deleteData,
  //   //   createData,
  createData,
} = require('../../controllers/waterIntakeControl')

router.route('/addWaterIntake').post(Verify, createData)
// router.route('/getmeal').get(getAllData)
router.route('/:waterId').get(getOneData).patch(updateData).delete(deleteData)
module.exports = router

//
//
