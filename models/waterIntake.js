const mongoose = require('mongoose')

const waterIntakeSchema = mongoose.Schema({
  user_id: String,
  amount_litres: Number,
  time_date: Date,
})

var waterIntakeDetails = mongoose.model('Water Intake', waterIntakeSchema)
module.exports.waterIntakeDetails = waterIntakeDetails
