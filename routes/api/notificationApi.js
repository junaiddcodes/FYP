var express = require('express')

var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/food')

const {
  getAllData,
  getOneData,

  deleteData,
  createData,
  //   getbyName,
} = require('../../controllers/notificationControl')

router.route('/createNotification').post(createData)
router.route('/getNotification').get(getAllData)
router.route('/:messageId').delete(deleteData).get(getOneData)
// router.route("/:planId/:trainerId").patch(updateData);
// router.route('/name/:excercise_name').get(getbyName)
module.exports = router

//
