const mongoose = require("mongoose");
const Joi = require("joi");

var foodApiSchema = mongoose.Schema({
  food_name: String,
  food_weight: Number, //It is the weight of Food that store in database. For example In database 100g of weight of food is stored. If you take 500g of that specific food then you need to input 5 in quantity.
  food_calories: Number,
  food_proteins: Number,
  food_carbs: Number,
  food_fats: Number,
});

var foodApiDetails = mongoose.model("Food_API_Data", foodApiSchema);

function validateFood(data) {
  const schema = Joi.object({
    food_name: Joi.string().required(),
    food_weight: Joi.number().positive().required(),
    food_calories: Joi.number().required(),
    food_proteins: Joi.number().positive().required(),
    food_carbs: Joi.number().positive().required(),
    food_fats: Joi.number().positive().required(),
  });
  return schema.validate(data);
}

module.exports.foodApiDetails = foodApiDetails;
module.exports.Validate = validateFood;
