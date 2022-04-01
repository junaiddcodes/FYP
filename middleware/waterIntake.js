const { Validate } = require('../models/waterIntake')

function validateWater(req, res, next) {
  let { error } = Validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}

module.exports.Verify = validateWater
