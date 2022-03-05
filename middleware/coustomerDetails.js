var bcrypt = require('bcryptjs')
var _ = require('lodash')

const { Validate } = require('../models/customerDetails')

function validateCoustomer(req, res, next) {
  let { error } = Validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}

async function passwordHash(req, res, next) {
  try {
    // console.log('check middleware')
    let salt = await bcrypt.genSalt(10)
    req.body.user_id.password = await bcrypt.hash(
      req.body.user_id.password,
      salt
    )
    // console.log(req.body.user_id.password)
    next()
  } catch (error) {
    res.status(2000).json({ message: error })
  }
}
module.exports.Hash = passwordHash
module.exports.Verify = validateCoustomer
