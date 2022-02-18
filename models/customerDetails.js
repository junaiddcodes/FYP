const mongoose = require('mongoose')
const { userSchema } = require('./userModel')

const Joi = require('joi')

var customerDetailsSchema = mongoose.Schema({
  user_id: userSchema,
  gender: String,
  weight: Number,
  height: Number,
  activity_level: String,
  weight_goal: Number,
  weekly_goal: Number,
  dob: Date,
  calorie_goal: Number,
})

var customerDetails = mongoose.model('Customer_Details', customerDetailsSchema)

function validateCoustomers(data) {
  const schema = Joi.object({
    user_id: {
      first_name: Joi.string().min(3).max(24).required(),
      last_name: Joi.string().min(3).max(24).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30).required(),
    },

    gender: Joi.string().min(3).max(10).required(),
    weight: Joi.number().positive().required(),
    height: Joi.number().positive().required(),
    activity_level: Joi.string().required(),
    weight_goal: Joi.number().positive().required(),
    weekly_goal: Joi.number().positive().required(),
    dob: Joi.date().required(),
    calorie_goal: Joi.number().positive().required(),
  })
  return schema.validate(data)
}
module.exports = { customerDetails }
module.exports.Validate = validateCoustomers
