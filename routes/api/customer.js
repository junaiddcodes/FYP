var express = require('express')
var router = express.Router()
// const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require('../../middleware/coustomerDetails')
var { Hash } = require('../../middleware/coustomerDetails')

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  registerCustomer,
} = require('../../controllers/customerControl')

router.route('/register').post(Verify, registerCustomer)
router.route('/').get(getAllData)
router
  .route('/:userId')
  .get(getOneData)
  .patch(Verify, updateData)
  .delete(deleteData)

module.exports = router

// .post(createData)

//

//
