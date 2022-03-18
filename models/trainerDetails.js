const mongoose = require('mongoose')
const { userSchema } = require('./userModel')

const Joi = require('joi')

var trainerDetailsSchema = mongoose.Schema({
  user_id: userSchema,
  gender: String,
  listed: Boolean, //Trainer approved by admin or not
  company_name: String,
  designation: String,
  time_worked: Number, //In Years
  qualification: String,
  trainer_desc: String, //Trainer Description
  certificate_file: String,
  trainer_photo: String,
})

// Create Model of Schema in Trainer_Details
var trainerDetails = mongoose.model('Trainer_Details', trainerDetailsSchema)

function validateTrainer(data) {
  const schema = Joi.object({
    user_id: {
      first_name: Joi.string().min(3).max(24).required(),
      last_name: Joi.string().min(3).max(24).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30).required(),
    },

    gender: Joi.string().min(3).max(10).required(),
    listed: Joi.boolean().required(),
    company_name: Joi.string().required(),
    designation: Joi.string().required(),
    time_worked: Joi.number().positive().max(24).required(),
    qualification: Joi.string().required(),
    trainer_desc: Joi.string().required(),
    certificate_file: Joi.string().required(),
    trainer_photo: Joi.string().required(),
  })
  return schema.validate(data)
}

module.exports.trainerDetails = trainerDetails

module.exports.Validate = validateTrainer
