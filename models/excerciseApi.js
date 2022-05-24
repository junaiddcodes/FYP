const mongoose = require('mongoose')

const excerciseApiSchema = mongoose.Schema({
  excercise_name: String,
  met_value: Number
})

const excerciseApiModel = mongoose.model('Excercise_Api', excerciseApiSchema)

module.exports.excerciseApiModel = excerciseApiModel
