var bcrypt = require('bcryptjs')
var _ = require('lodash')

const { Validate } = require('../models/adminDetails')
const { customerDetails } = require('../models/adminDetails')

const jwt = require('jsonwebtoken')
const config = require('config')

function validateAdmin(req, res, next) {
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
async function auth(req, res, next) {
  let token = req.header('x-auth-token')
  if (!token) return res.status(400).send('Token Not Provided')
  try {
    let user = jwt.verify(token, config.get('jwtPrivateKey'))
    //req.user = user

    console.log(user._id)
    req.user = await customerDetails.findById(user._id)
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  next()
}

module.exports.Hash = passwordHash
module.exports.Verify = validateAdmin
module.exports.Auth = auth
