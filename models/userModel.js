const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var userSchema = mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
  user_type: String,
});

// userSchema.methods.generateHashPassword = async function () {
//   let salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// }
var Users = mongoose.model("Users", userSchema);

module.exports.Users = Users;
module.exports.userSchema = userSchema;
