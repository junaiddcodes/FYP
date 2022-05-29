var express = require('express')
var router = express.Router()
// // const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require('../../middleware/gymDetails')
var { Auth } = require('../../middleware/gymDetails')
var { Hash } = require('../../middleware/coustomerDetails')
const upload = require('../../utils/multer')

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  loginGym,
  createData,
  checkUser,
  completeGym,
  gymImage,
  gymNotListed,
  gymSearchFilter,
} = require('../../controllers/gym_Controller')

router.route('/gymregister').post(Verify, Hash, createData)
router.route('/').get(getAllData)
router.route('/not-listed').get(gymNotListed)
router.route('/search').post(gymSearchFilter)
router.route('/:gymId').delete(deleteData).get(getOneData).patch(completeGym)
router.route('/image/:gymId').patch(upload.array('gym'), gymImage)
router.route('/login').post(loginGym)
router.route('/log').post(Auth, checkUser)

module.exports = router

//

//
