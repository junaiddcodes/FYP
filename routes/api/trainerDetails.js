var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/coustomerDetails')

const {
  //   getAllData,
  //   getOneData,
  //   updateData,
  //   deleteData,
  //   createData,
  createData,
} = require('../../controllers/trainer_Controller')

router.route('/trainerregister').post(createData)
// router.route('/trainer').get(getAllData)
// router.route('/:trainerId').delete(deleteData).get(getOneData).patch(updateData)

module.exports = router
