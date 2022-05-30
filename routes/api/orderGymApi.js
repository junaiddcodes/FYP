var express = require("express");
var router = express.Router();
var { Verify } = require("../../middleware/orderGymMiddleware");

const {
    getAllData,
    getOneData,
    updateData,
    createData,
    getOrderCheck
  } = require("../../controllers/orderGymController");

  router.route("/").get(getAllData);
  router.route("/orderCreate").post(Verify, createData);
  router.route("/:orderId").get(getOneData).patch(updateData);
  router.route("/gym/:userId/:gymId").get(getOrderCheck);

  module.exports = router;

  