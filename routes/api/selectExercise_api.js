var express = require('express')

var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/food')

const {
  //   getAllData,
  getOneData,
  updateData,
  deleteData,

  createData,
  //   getbyName,
} = require('../../controllers/selectExcersiseController')

router.route('/addSelectexercise').post(createData)
router.route('/user/:customerId').get(getOneData)
router.route('/:selectId').patch(updateData).delete(deleteData)

// router.route('/name/:excercise_name').get(getbyName)
module.exports = router
