const mongoose = require("mongoose");
const Joi = require("joi");

var orderShema = mongoose.Schema({
  user_id: String,
  plan_id: String,
  trainer_id: String,
  plan_title: String,
  price: Number,
  time_date: Date,
  review: Number,
  review_comment: String,
  withdraw: { type: Boolean, default: true },
});

var orderDetails = mongoose.model("Order Details", orderShema);

function validateOrder(data) {
  const schema = Joi.object({
    user_id: Joi.string(),
    plan_id: Joi.string(),
    trainer_id: Joi.string(),
    plan_title: Joi.string(),
    price: Joi.number(),
    time_date: Joi.date(),
    review: Joi.number(),
    review_comment: Joi.string(),
    withdraw: Joi.boolean(),
  });
  return schema.validate(data);
}

module.exports.orderDetails = orderDetails;

module.exports.Validate = validateOrder;
