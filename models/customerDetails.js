const mongoose = require('mongoose')
const { userSchema } = require('./userModel')
var bycrpt = require('bcryptjs')

const Joi = require('joi')
const bcryptjs = require('bcryptjs')

var customerDetailsSchema = mongoose.Schema({
  user_id: userSchema,
  gender: String,
  weight: Number,
  height: Number,
  activity_level: String,
  weight_goal: String,
  weekly_goal: Number,
  dob: Date,
  calorie_goal: Number,

  protein: Number,
  carbs: Number,
  fats: Number,
  resetLink: {
    data: String,
    default: '',
  },
})
customerDetailsSchema.methods.generateHashPassword = async function () {
  let salt = await bcrypt.genSalt(10)
  user_id.password = await bcrypt.hash(user_id.password, salt)
}
var customerDetails = mongoose.model('Customer_Details', customerDetailsSchema)

function validateCoustomers(data) {
  const schema = Joi.object({
    user_id: {
      full_name: Joi.string().min(3).max(32).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30).required(),
    },

    gender: Joi.string().min(3).max(10).required(),
    weight: Joi.number().positive().required(),
    height: Joi.number().positive().required(),
    activity_level: Joi.string().required(),
    weight_goal: Joi.string().required(),
    weekly_goal: Joi.number().positive().required(),
    dob: Joi.date().required(),
    calorie_goal: Joi.number().positive().required(),
    protein: Joi.number().positive().required(),
    carbs: Joi.number().positive().required(),
    fats: Joi.number().positive().required(),
  })
  return schema.validate(data)
}

module.exports = { customerDetails }
module.exports.Validate = validateCoustomers
