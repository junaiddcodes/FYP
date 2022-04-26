const mongoose = require('mongoose')
const { userSchema } = require('./userModel')
const Joi = require('joi')

const adminSchema = mongoose.Schema({
  user_id: userSchema,
})
adminSchema.methods.generateHashPassword = async function () {
  let salt = await bcrypt.genSalt(10)
  user_id.password = await bcrypt.hash(user_id.password, salt)
}

const adminModel = mongoose.model('Admins', adminSchema)
function validateAdmin(data) {
  const schema = Joi.object({
    user_id: {
      full_name: Joi.string().min(3).max(32).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30).required(),
    },
  })
  return schema.validate(data)
}

module.exports.adminModel = adminModel
module.exports.Validate = validateAdmin
