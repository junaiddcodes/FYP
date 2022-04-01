const mongoose = require('mongoose')
const Joi = require('joi')

const waterIntakeSchema = mongoose.Schema({
  user_id: String,
  amount_litres: Number,
  time_date: Date,
})

var waterIntakeDetails = mongoose.model('Water Intake', waterIntakeSchema)
function validateWater(data) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    amount_litres: Joi.number().positive().required(),
    time_date: Joi.date().required(),
  })
  return schema.validate(data)
}
module.exports.waterIntakeDetails = waterIntakeDetails
module.exports.Validate = validateWater
