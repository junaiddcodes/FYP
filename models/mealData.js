const mongoose = require('mongoose')
const Joi = require('joi')

const mealDataSchema = mongoose.Schema({
  customer_Id: String,
  meal_name: String,
  food_weight: Number,
  food_calories: Number,
  food_proteins: Number,
  food_carbs: Number,
  food_fats: Number,
  food_quantity: Number,
  time_date: Date,
})

var mealDataDetails = mongoose.model('Meal_Data', mealDataSchema)

function validateMeal(data) {
  const schema = Joi.object({
    customer_Id: Joi.string().required(),
    meal_name: Joi.string().required(),
    food_weight: Joi.number().positive().required(),
    food_calories: Joi.string().required(),
    food_proteins: Joi.number().positive().required(),
    food_carbs: Joi.number().positive().required(),
    food_fats: Joi.number().positive().required(),
    food_quantity: Joi.number().positive().required(),
    time_date: Joi.date().required(),
  })
  return schema.validate(data)
}

module.exports.mealDataDetails = mealDataDetails
module.exports.Validate = validateMeal
