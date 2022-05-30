var express = require("express");
var router = express.Router();
var { Verify } = require("../../middleware/orderMiddlewares");

const {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  getbyUser,
  checkUserOrder,
  getTrainersSale,
  postRevew,
  getOrderbyPlan,
  getOrderUserPlan,
} = require("../../controllers/order_controller");

router.route("/orderCreate").post(Verify, createData);
router.route("/").get(getAllData);
router.route("/user/:userId").get(getbyUser);
router.route("/userplan/:userId/:planId").get(getOrderUserPlan);
router.route("/plan/:planId").get(getOrderbyPlan);
router.route("/trainer/:trainerId").get(getTrainersSale);
router.route("/check").post(checkUserOrder);
router.route("/review").post(postRevew);
router.route("/:orderId").get(getOneData).delete(deleteData).patch(updateData);

module.exports = router;
