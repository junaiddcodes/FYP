const mongoose = require('mongoose')

const selectedExcerciseSchema = mongoose.Schema({
  customer_Id: String,
  excercise_name: String,
  excercise_type: String,
  excercise_id : String,
  user_weight: Number,
  excercise_calories: Number,
  excercise_proteins: Number,
  excercise_carbs: Number,
  excercise_fats: Number,
  excercise_time: Number,
  met_value: Number,
  time_date: Date,
})

const selectedExcerciseModel = mongoose.model(
  'Selected_Excercise',
  selectedExcerciseSchema
)

module.exports.selectedExcerciseModel = selectedExcerciseModel
