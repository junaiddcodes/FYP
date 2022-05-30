const { Validate } = require('../models/orderGymDetails')


function validateCoustomer(req, res, next) {
  let { error } = Validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}

module.exports.Verify = validateCoustomer