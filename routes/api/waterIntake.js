var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/meal')

const {
  //   getAllData,
  //   //   getOneData,
  //   updateData,
  //   deleteData,
  //   //   createData,
  createData,
} = require('../../controllers/mealControl')

router.route('/addWaterIntake').post(createData)
// router.route('/getmeal').get(getAllData)
// router.route('/:mealId').patch(updateData).delete(deleteData)
module.exports = router

// .get(getOneData)
