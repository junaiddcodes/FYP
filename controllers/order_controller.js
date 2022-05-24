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
    const crud = await orderDetails.findByIdAndUpdate(
      { _id: crudId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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

    res.status(200).json({ message: "Object Deleted " });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
};
