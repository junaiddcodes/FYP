var express = require("express");
var router = express.Router();
var { Verify } = require("../../middleware/orderMiddlewares");

const {
    getAllData,
    getOneData,
    updateData,
    deleteData,
    createData,
    getbyUser
  } = require("../../controllers/order_controller");

  router.route("/orderCreate").post(Verify, createData);
  router.route("/").get(getAllData);
  router.route("/user/:userId").get(getbyUser);
  router.route("/:orderId").get(getOneData).delete(deleteData).patch(updateData);

module.exports = router;
