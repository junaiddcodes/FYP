const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    user_type: String
})


var Users = mongoose.model("Users",userSchema);

module.exports.Users = Users;
module.exports.userSchema = userSchema;