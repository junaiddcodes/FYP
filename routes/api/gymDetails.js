var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/coustomerDetails')

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  //   createData,
  createData,
} = require('../../controllers/gym_Controller')

router.route('/gymregister').post(createData)
router.route('/gym').get(getAllData)
router.route('/:gymId').delete(deleteData).get(getOneData).patch(updateData)

module.exports = router

//

//
