const mongoose = require("mongoose");
const Joi = require("joi");

var orderGymShema = mongoose.Schema({
  user_id: String,
  gym_id: String,
  price: Number,
  time_date: Date,
});

var orderGymDetails = mongoose.model("Order Gym Details", orderGymShema);

function validateOrderGym(data) {
  const schema = Joi.object({
    user_id: Joi.string(),
    gym_id: Joi.string(),
    price: Joi.number(),
    time_date: Joi.date(),
  });
  return schema.validate(data);
}

module.exports.orderGymDetails = orderGymDetails;

module.exports.Validate = validateOrderGym;
