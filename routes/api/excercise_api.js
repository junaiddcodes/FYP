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
  getbyName,
} = require('../../controllers/excerciseController')

router.route('/addexercise').post(createData)
// router.route('/getfood').get(getAllData)
router.route('/:exerciseId').patch(updateData).delete(deleteData).get(getOneData)

router.route('/name').post(getbyName)
module.exports = router
