var express = require("express");
var router = express.Router();
// // const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require("../../middleware/queryMiddleware");

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,

  createData,
  getUserData,
  // getbyName,
} = require("../../controllers/queryControler");

router.route("/addQuery").post(Verify, createData);
router.route("/getQuery").get(getAllData);
router.route("/:queryId").get(getOneData).delete(deleteData).patch(updateData);
router.route("/user/:userId").get(getUserData);
// router.route('/name').post(getbyName)
module.exports = router;

// .
