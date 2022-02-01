const mongoose = require("mongoose");
const {userSchema} = require("./userModel");

var trainerDetailsSchema = mongoose.Schema({
    userId:userSchema,
    gender: String,
    listed: Boolean, //Trainer approved by admin or not
    company_name: String,
    designation: String,
    time_worked: Number, //In Years
    qualification: String,
    trainer_desc: String, //Trainer Description
    certificate_file: String,
    trainer_photo: String
});

// Create Model of Schema in Trainer_Details 
var trainerDetails = mongoose.Model("Trainer_Details",trainerDetailsSchema);

module.exports.trainerDetails = trainerDetails;