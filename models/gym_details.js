const mongoose = require("mongoose");
const {userSchema} = require("./userModel");

//gym Details Schema

var gymDetailsSchema = mongoose.Schema({

    userId: userSchema,
    listed: Boolean, //Check the Gym is listed or not
    location: String,
    gym_desc: String, //Store Gym Description
    gym_contact_no: Number,
    gym_membership_price: Number,
    gender_facilitation: String,
    gym_photo: String

})

// Create Model For Gym in Gym_Details Table

var gymDetails = mongoose.model("Gym_Details",gymDetailsSchema);

// Export Gym Details Model
module.exports.gymDetails = gymDetails;

