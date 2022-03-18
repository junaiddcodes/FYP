const mongoose = require('mongoose')
const { userSchema } = require('./userModel')
const Joi = require('joi')

//gym Details Schema

var gymDetailsSchema = mongoose.Schema({
  user_id: userSchema,
  listed: Boolean, //Check the Gym is listed or not
  location: String,
  gym_desc: String, //Store Gym Description
  gym_contact_no: String,
  gym_membership_price: Number,
  gender_facilitation: String,
  gym_photo: String,
})

// Create Model For Gym in Gym_Details Table

var gymDetails = mongoose.model('Gym_Details', gymDetailsSchema);

function validateGym(data){
  const schema = Joi.object({
    user_id: {
      first_name: Joi.string().min(3).max(24).required(),
      last_name: Joi.string().min(3).max(24),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30).required(),
    },
    listed: Joi.boolean().required(),
    location: Joi.string().required(),
    gym_desc: Joi.string().required(),
    gym_contact_no: Joi.string().min(5).required(),
    gym_membership_price: Joi.number().positive().required(),
    gender_facilitation: Joi.string().required(),
    gym_photo: Joi.string(),
  })
  return schema.validate(data)
}

// Export Gym Details Model
module.exports.gymDetails = gymDetails
module.exports.Validate = validateGym;
