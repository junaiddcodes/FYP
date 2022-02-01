var express = require('express');
var router = express.Router();
const {getData} = require("../../controllers/users")

// Get Request

router.route('/').get(getData)


module.exports = router;
