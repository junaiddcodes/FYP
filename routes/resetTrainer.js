const { trainerDetails } = require('../models/trainerDetails')
const { Token } = require('../models/token')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const Joi = require('joi')
const express = require('express')
const router = express.Router()
const config = require('config')
var bcryptjs = require('bcryptjs')

router.post('/reset', async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() })
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await trainerDetails.findOne({
      'user_id.email': req.body.email,
    })
    if (!user)
      return res.status(400).send("user with given email doesn't exist")

    let token = await Token.findOne({ userId: user._id })
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }

    const link = `${config.get('CLIENT_URL')}password-reset/trainer/${
      user._id
    }/${token.token}`
    await sendEmail(user.user_id.email, 'Password reset', link)

    res.send('password reset link sent to your email account')
  } catch (error) {
    res.send('An error occured')
    console.log(error)
  }
})

router.post('/:userId/:token', async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() })
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await trainerDetails.findById(req.params.userId)
    if (!user) return res.status(400).send('invalid link or expired')

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    })
    if (!token) return res.status(400).send('Invalid link or expired')

    let salt = await bcryptjs.genSalt(10)
    var new_password = await bcryptjs.hash(req.body.password, salt)

    user.user_id.password = new_password
    await user.save()
    await token.delete()

    res.send('password reset sucessfully.')
  } catch (error) {
    res.send('An error occured')
    console.log(error)
  }
})

module.exports = router
