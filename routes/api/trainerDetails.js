var express = require("express");
var router = express.Router();
// // const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require("../../middleware/trainer");
var { Hash } = require("../../middleware/coustomerDetails");
var { Auth } = require("../../middleware/trainer");
var { Upload } = require("../../middleware/trainer");

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  loginUser,
  createData,
  checkUser,
} = require("../../controllers/trainer_Controller");

router.route("/trainerregister").post(Verify, Hash, createData);
router.route("/trainer").get(getAllData);
router.route("/:trainerId").get(getOneData).patch(Verify, updateData).delete(deleteData);

router.route("/login").post(loginUser);
router.route("/log").post(Auth, checkUser);
module.exports = router;
//
//
