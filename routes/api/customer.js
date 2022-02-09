var express = require('express')
var router = express.Router()
// const {registerCustomer} = require("../../controllers/customerControl")

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  //   createData,
  registerCustomer,
} = require('../../controllers/customerControl')

router.route('/register').post(registerCustomer)
router.route('/').get(getAllData)
router.route('/:userId').get(getOneData).patch(updateData).delete(deleteData)

module.exports = router

// .post(createData)

//

//
