const mongoose = require('mongoose')


const createPlanSchema = mongoose.Schema({
    trainer_id: String,
    plan_title: String,
    plan_desc: String,
    plan_duration_weeks: Number,
    total_activities: [{
        week_no:Number,
        activities:[{activity_day:String,
        activity:String}]
    }],

    plan_price: String
})


const createPlanModel = mongoose.model("Trainer-Plan",createPlanSchema);


module.exports.createPlanModel = createPlanModel

