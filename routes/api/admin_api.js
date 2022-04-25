var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/food')
var { Verify } = require('../../middleware/adminMiddleware')
var { Hash } = require('../../middleware/adminMiddleware')
var { Auth } = require('../../middleware/adminMiddleware')

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  loginUser,
  checkUser,
} = require('../../controllers/adminController')

router.route('/addAdmin').post(Verify, Hash, createData)
router.route('/getAdmin').get(getAllData)
router
  .route('/:adminId')
  .get(getOneData)
  .delete(deleteData)
  .patch(Verify, Hash, updateData)
router.route('/Adminlogin').post(loginUser)
router.route('/log').post(Auth, checkUser)

// router.route('/name').post(getbyName)
module.exports = router

//
//
//
