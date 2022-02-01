var express = require('express');
var router = express.Router();
const {registerCustomer} = require("../../controllers/customerControl")


router.route("/register").post(registerCustomer);


module.exports = router;