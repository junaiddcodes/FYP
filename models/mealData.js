const mongoose = require('mongoose');


const mealDataSchema = mongoose.Schema({
        customer_Id: String,
        meal_name: String,
        food_weight: Number, 
        food_calories: Number,
        food_proteins: Number,
        food_carbs: Number,
        food_fats: Number,
        food_quantity: Number,
        time_date: Date       
})