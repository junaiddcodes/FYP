const mongoose = require('mongoose')

const selectedExcerciseSchema = mongoose.Schema({
  excercise_name: String,
  excercise_duration: String,
  burnt_calories: String,
  time_performed: Number,
  time_date: Date,
})

const selectedExcerciseModel = mongoose.model(
  'Selected_Excercise',
  selectedExcerciseSchema
)

module.exports.selectedExcerciseModel = selectedExcerciseModel
