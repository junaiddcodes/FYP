var express = require("express");
var router = express.Router();
// // const { registerCustomer } = require('../../controllers/customerControl')
var { Verify } = require("../../middleware/trainer");
var { Hash } = require("../../middleware/coustomerDetails");
var { Auth } = require("../../middleware/trainer");
const upload = require("../../utils/multer");

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  loginUser,
  createData,
  checkUser,
  completeTrainer,
  trainerImage,
  trainerNotListed,
  trainerSearchFilter,
  changePassword,
} = require("../../controllers/trainer_Controller");

router.route("/trainerregister").post(Verify, Hash, createData);
router.route("/trainer").get(getAllData);
router.route("/not-listed").get(trainerNotListed);
router.route("/search").post(trainerSearchFilter);
router.route("/:trainerId").get(getOneData).patch(completeTrainer).delete(deleteData);

router.route("/image/:trainerId").patch(upload.single("trainer"), trainerImage);
router.route("/password").post(changePassword);

router.route("/login").post(loginUser);
router.route("/log").post(upload.single("image"), checkUser);
module.exports = router;
//
//
