const mongoose = require("mongoose");

const createPlanSchema = mongoose.Schema({
  trainer_id: String,
  plan_title: String,
  plan_duration: Number,
  plan_price: Number,
  plan_desc: String,
  monday_activities: String,
  tuesday_activities: String,
  wednesday_activities: String,
  thursday_activities: String,
  friday_activities: String,
  saturday_activities: String,
  sunday_activities: String,
});

const createPlanModel = mongoose.model("Trainer-Plan", createPlanSchema);

module.exports.createPlanModel = createPlanModel;
