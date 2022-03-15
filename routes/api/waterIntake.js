var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/meal')

const {
  //   getAllData,
  getOneData,
  updateData,
  deleteData,
  //   //   createData,
  createData,
} = require('../../controllers/waterIntakeControl')

router.route('/addWaterIntake').post(createData)
// router.route('/getmeal').get(getAllData)
router.route('/:waterId').get(getOneData).patch(updateData).delete(deleteData)
module.exports = router

//
//
