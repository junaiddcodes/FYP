const mongoose = require('mongoose')

const selectedExcerciseSchema = mongoose.Schema({
  excercise_name: String,
  excercise_type: String,
  excercise_id : String,
  excercise_weight: Number,
  excercise_calories: Number,
  excercise_proteins: Number,
  excercise_carbs: Number,
  excercise_fats: Number,
  met_value: Number
})

const selectedExcerciseModel = mongoose.model(
  'Selected_Excercise',
  selectedExcerciseSchema
)

module.exports.selectedExcerciseModel = selectedExcerciseModel
