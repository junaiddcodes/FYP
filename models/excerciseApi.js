const mongoose = require('mongoose')

const excerciseApiSchema = mongoose.Schema({
  excercise_name: String,
  excercise_duration: String,
  burnt_calories: String,
})

const excerciseApiModel = mongoose.model('Excercise_Api', excerciseApiSchema)

module.exports.excerciseApiModel = excerciseApiModel
