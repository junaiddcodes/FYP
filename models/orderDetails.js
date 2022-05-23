const mongoose = require('mongoose')
const Joi = require("joi");

var orderShema = mongoose.Schema({
    user_id: String,
    plan_id: String
  });


  var orderDetails = mongoose.model("Order Details", orderShema);

  function validateOrder(data) {
    const schema = Joi.object({
      user_id: Joi.string(),
      plan_id: Joi.string()
    });
    return schema.validate(data);
  }


module.exports.orderDetails = orderDetails;

module.exports.Validate = validateOrder;

