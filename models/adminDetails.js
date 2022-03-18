const mongoose = require('mongoose')
const { userSchema } = require('./userModel')

const adminSchema = mongoose.Schema({
    user_id: userSchema,
})

const adminModel = mongoose.model("Admins",adminSchema)

module.exports.adminModel = adminModel;