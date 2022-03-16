var _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('config')

const {Validate} = require("../models/gym_details");
const {gymDetails} = require("../models/gym_details")


function validateGym(req, res, next) {
    let { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    next()
}

async function auth(req, res, next) {
    let token = req.header('x-auth-token')
    if (!token) return res.status(400).send('Token Not Provided')
    try {
      let user = jwt.verify(token, config.get('jwtPrivateKey'))
      //req.user = user
  
      console.log(user._id)
      req.user = await gymDetails.findById(user._id)
    } catch (err) {
      return res.status(401).send('Invalid Token')
    }
    next()
}


  module.exports.Verify = validateGym;
  module.exports.Auth = auth;