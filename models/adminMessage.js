const mongoose = require('mongoose')

const adminMessageSchema = mongoose.Schema({
  message: String,
})

const adminMessageModel = mongoose.model('Admin-Message', adminMessageSchema)

module.exports.adminMessageModel = adminMessageModel
