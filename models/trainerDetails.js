const mongoose = require('mongoose')
const { userSchema } = require('./userModel')

const Joi = require('joi')

var trainerDetailsSchema = mongoose.Schema({
  user_id: userSchema,
  gender: String,
  exercise_type: String,
  listed: Boolean, //Trainer approved by admin or not
  company_name: String,
  designation: String,
  time_worked: Number, //In Years
  dob: Date,
  trainer_desc: String, //Trainer Description
  certificate_file: String,
  trainer_photo: String,
})

// Create Model of Schema in Trainer_Details
var trainerDetails = mongoose.model('Trainer_Details', trainerDetailsSchema)

function validateTrainer(data) {
  const schema = Joi.object({
    user_id: {
      full_name: Joi.string().min(3).max(24),
      email: Joi.string().min(3).email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30),
    },

    gender: Joi.string().min(3).max(10).required(),
    exercise_type: Joi.string(),
    listed: Joi.boolean(),
    company_name: Joi.string(),
    designation: Joi.string(),
    time_worked: Joi.number().positive().max(24),
    dob: Joi.date().required(),
    trainer_desc: Joi.string(),
    certificate_file: Joi.string(),
    trainer_photo: Joi.string(),
  })
  return schema.validate(data)
}

module.exports.trainerDetails = trainerDetails

module.exports.Validate = validateTrainer
