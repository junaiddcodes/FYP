const mongoose = require('mongoose')


const waterIntakeSchema = mongoose.Schema({
    user_id: String,
    amount_litres: Number,
    time_date: Date,

})