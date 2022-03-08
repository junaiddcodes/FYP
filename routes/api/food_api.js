var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require('../../middleware/food')

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  //   createData,
  createData,
  getbyName,
} = require('../../controllers/foodControl')

router.route('/addfood').post(Verify, createData)
router.route('/getfood').get(getAllData)
router
  .route('/:foodId')
  .patch(Verify, updateData)
  .delete(deleteData)
  .get(getOneData)
router.route('/name/:food_name').get(getbyName)
module.exports = router
