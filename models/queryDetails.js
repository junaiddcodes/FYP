const mongoose = require('mongoose')
const Joi = require('joi')

const queryDetailsSchema = mongoose.Schema({
  user_id: String,
  user_type: String,
  query_subject: String,
  query_desc: String,
  query_response: String,
})

const queryDetailsModel = mongoose.model('Queries', queryDetailsSchema)

function validateQuery(data) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    user_type: Joi.string().required(),
    query_subject: Joi.string().required(),
    query_desc: Joi.string().required(),
    query_response: Joi.string().required(),
  })
  return schema.validate(data)
}

module.exports.queryDetailsModel = queryDetailsModel
module.exports.Validate = validateQuery
