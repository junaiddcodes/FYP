var express = require('express')
var router = express.Router()
const {
  //   getAllData,
  getData,
  //   updateData,
  //   deleteData,
  //   //   createData,
  //   registerCustomer,
} = require('../../controllers/users')

// Get Request

router.route('/users').get(getData)

// router.route('/register').post(Verify, registerCustomer)
// router.route('/').get(getAllData)
// router
//   .route('/:userId')
//   .get(getOneData)
//   .patch( updateData)
//   .delete(deleteData)

module.exports = router
