const mongoose = require("mongoose");
const { userSchema } = require("./userModel");
const Joi = require("joi");

//gym Details Schema
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

var gymDetailsSchema = mongoose.Schema({
  user_id: userSchema,
  listed: String, //Check the Gym is listed or not
  location: { city: String, address: String, state: String },
  gym_desc: String, //Store Gym Description
  gym_contact_no: String,
  gym_membership_price: Number,
  gender_facilitation: String,
  coordinates: { lat: Number, long: Number },
  gym_photos: [{ photo_url: String, cloudinary_id: String }],
  rating: {
    type: Number,
  },
  membership: { type: Boolean, default: false },

  numReviews: {
    type: Number,
  },
  bank_details: {
    bank_name: String,
    account_number: String,
    account_name: String,
  },
});

var gymDetails = mongoose.model("Gym_Details", gymDetailsSchema);

function validateGym(data) {
  const schema = Joi.object({
    user_id: {
      full_name: Joi.string().min(3).max(24).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(8).required(),
      user_type: Joi.string().min(3).max(30).required(),
    },
    listed: Joi.string(),
    location: {
      city: Joi.string(),
      address: Joi.string(),
      state: Joi.string(),
    },
    bank_details: {
      bank_name: Joi.string(),
      account_number: Joi.string(),
      account_name: Joi.string(),
    },
    cordinates: { lat: Joi.number(), long: Joi.number() },

    gym_desc: Joi.string(),
    gym_contact_no: Joi.string().min(5),
    gym_membership_price: Joi.number().positive(),
    gender_facilitation: Joi.string(),
    membership: Joi.boolean(),
    gym_photos: Joi.array().items(
      Joi.object({
        photo_url: Joi.string(),
        cloudinary_id: Joi.string(),
      })
    ),
  });
  return schema.validate(data);
}

// Export Gym Details Model
module.exports.gymDetails = gymDetails;
module.exports.Validate = validateGym;
