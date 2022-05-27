var express = require('express')
var router = express.Router()
// const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require('../../middleware/coustomerDetails')
var { Hash } = require('../../middleware/coustomerDetails')
var { Auth } = require('../../middleware/coustomerDetails')

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  loginUser,
  checkUser,
  changePassword
  //registerCustomer,
} = require('../../controllers/customerControl')

router.route('/register').post(Verify, Hash, createData)
router.route('/').get(getAllData)
router
  .route('/:userId')
  .get(getOneData)
  .patch(Hash, updateData)
  .delete(deleteData)

router.route('/login').post(loginUser)
router.route('/password').post(changePassword)
router.route('/log').post(Auth, checkUser)

module.exports = router

// .post(createData)

// .post(createData)

//

//
