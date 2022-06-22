const mongoose = require("mongoose");
const Joi = require("joi");

const withdrawSchema = mongoose.Schema({
  user_id: String,
  amount: Number,
  time_date: Date,
  user_type: String,
  payment_processed: { type: Boolean, default: false },
});

var withdrawDetails = mongoose.model("Withdraw Details", withdrawSchema);

function validateWithdraw(data) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    amount: Joi.number().positive().required(),
    time_date: Joi.date(),
    user_type: Joi.string(),
    payment_processed: Joi.boolean(),
  });
  return schema.validate(data);
}

module.exports.withdrawDetails = withdrawDetails;
module.exports.Validate = validateWithdraw;
