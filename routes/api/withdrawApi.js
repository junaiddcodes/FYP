var express = require('express')
var router = express.Router()


var { Verify } = require('../../middleware/withdrawMiddleware')


const {
    getAllData,
    updateData,
    createData,
    getOneData
  } = require('../../controllers/withdraw_controller')


  router.route('/create').post(Verify, createData)
  router.route('/').get(getAllData)
  router.route('/:withdrawId').get(getOneData)
  router.route('/update/:withdrawId').patch(updateData)

  module.exports = router
