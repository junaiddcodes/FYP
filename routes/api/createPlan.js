var express = require("express");

var router = express.Router();
// // const { registerCustomer } = require('../../controllers/customerControl')
// var { Verify } = require('../../middleware/food')

const {
  //   getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  //   getbyName,
} = require("../../controllers/createPlanontroller");

router.route("/createPlan").post(createData);
// router.route('/getfood').get(getAllData)
router.route("/:planId").get(getOneData).delete(deleteData);
router.route("/:planId/:trainerId").patch(updateData);
// router.route('/name/:excercise_name').get(getbyName)
module.exports = router;

// .patch(updateData)
