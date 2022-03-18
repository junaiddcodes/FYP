var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require('../../middleware/gymDetails');
var { Auth } = require('../../middleware/gymDetails');
var { Hash } = require('../../middleware/coustomerDetails')

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  loginGym,
  createData,
  checkUser
} = require('../../controllers/gym_Controller')

router.route('/gymregister').post(Verify,Hash,createData)
router.route('/').get(getAllData)
router.route('/:gymId').delete(deleteData).get(getOneData).patch(updateData)
router.route('/login').post(loginGym)
router.route('/log').post(Auth, checkUser)

module.exports = router

//

//
