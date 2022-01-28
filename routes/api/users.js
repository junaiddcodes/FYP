var express = require('express');
var router = express.Router();
var {Users} = require("../../models/userModel")

// Get Request

router.get('/',async (req,res)=>{
    var userData = await Users.find();
    return res.send(["userData","yData"]);


})

/* POST home page. */
router.post('/', async function(req, res, next) {
  var userData = new Users();
  
  userData.first_name = "Hassan";
  userData.last_name = "Ifthikhar";

  await userData.save();
  return res.send(userData);

});

module.exports = router;
