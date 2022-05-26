const _ = require("lodash");
var bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { orderDetails } = require("../models/orderDetails");
const { createPlanModel } = require("../models/create_plan");
const { customerDetails } = require("../models/customerDetails");
const { userSchema } = require("../models/userModel");

// //use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await orderDetails.find({});
    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//use to create data in db
const createData = async (req, res) => {
  try {
    var user = await customerDetails.findOne({ _id: req.body.user_id });
    var plan = await createPlanModel.findOne({ _id: req.body.plan_id });

    if (!user) {
      return res.status(404).json({ message: "Customer does not exist" });
    } else if (!plan) {
      return res.status(404).json({ message: "Plan does not exist" });
    }

    const checkPlan = await orderDetails.find({
      user_id: req.body.user_id,
      plan_id: req.body.plan_id,
    });

    console.log(checkPlan)

    if(checkPlan.length != 0){
      return res.status(404).json({ message: "User already have that Plan" });
    }
    const crud = await orderDetails.create(req.body);
    res.status(201).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// //this is use to update user in list
const updateData = async (req, res) => {
  try {
    const { orderId: crudId } = req.params;
    const crud = await orderDetails.findByIdAndUpdate({ _id: crudId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }

    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// // delete data from id
const deleteData = async (req, res) => {
  try {
    const { orderId: crudId } = req.params;
    const crud = await orderDetails.findByIdAndDelete({ _id: crudId });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }
    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { orderId: crudId } = req.params;
    const crud = await orderDetails.findOne({ _id: crudId });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }

    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//use to get only one data from db
const getbyUser = async (req, res) => {
  try {
    var planArr = [];
    const { userId: crudId } = req.params;
    const crud = await orderDetails.find({ user_id: crudId });

    crud.map((e) => {
      planArr.push(e.plan_id);
    });

    console.log(planArr);

    var plans = await createPlanModel.find({
      _id: {
        $in: planArr,
      },
    });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }

    res.status(200).json({ plans });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// //use to get only one data from db
// const getbyUser = async (req, res) => {
//   try {
//     const { userId: crudId } = req.params;
//     const crud = await orderDetails.find({ user_id: crudId });

//     if (!crud) {
//       return res.status(404).json({ message: "item does not exist" });
//     }

//     res.status(200).json({ crud });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

module.exports = {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  getbyUser,
};
