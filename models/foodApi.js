const mongoose = require('mongoose');

var foodApiSchema = mongoose.Schema({
    food_name: String,
    food_weight: Number, //It is the weight of Food that store in database. For example In database 100g of weight of food is stored. If you take 500g of that specific food then you need to input 5 in quantity.
    food_calories: Number,
    food_proteins: Number,
    food_carbs: Number,
    food_fats: Number
})