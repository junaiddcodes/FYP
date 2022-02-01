const {customerDetails} = require("../models/customerDetails");

//Customer Register to the system

const registerCustomer = async (req,res)=>{

    var customerData = new customerDetails({
        user_id:{
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.password,
            password: req.body.password,
            user_type: req.body.user_type
        },
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        activity_level: req.body.activity_level,
        weight_goal: req.body.weight_goal,
        weekly_goal: req.body.weekly_goal,
        dob: req.body.dob,
        calorie_goal: req.body.calorie_goal

    })

    await customerData.save();

    return res.status(200).send(customerData);

}


module.exports = {registerCustomer}