const mongoose = require("mongoose");
const {userSchema} = require("./userModel");

var customerDetailsSchema = mongoose.Schema({
    user_id: userSchema,
    gender: String,
    weight: Number,
    height: Number,
    activity_level: String,
    weight_goal: Number,
    weekly_goal: Number,
    dob: Date,
    calorie_goal: Number

})

var customerDetails = mongoose.model("Customer_Details",customerDetailsSchema);

module.exports= {customerDetails}