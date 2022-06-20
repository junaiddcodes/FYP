var _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('config')

const {Validate} = require("../models/withdrawApprove");


function validateWithdraw(req, res, next) {
    let { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    next()
}


module.exports.Verify = validateWithdraw;