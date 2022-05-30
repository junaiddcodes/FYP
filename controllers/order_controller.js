const _ = require("lodash");
var bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { orderDetails } = require("../models/orderDetails");
const { createPlanModel } = require("../models/create_plan");
const { customerDetails } = require("../models/customerDetails");
const { trainerDetails } = require("../models/trainerDetails");
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

    console.log(checkPlan);

    if (checkPlan.length != 0) {
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

const checkUserOrder = async (req, res) => {
  try {
    const crud = await orderDetails.find({
      user_id: req.body.user_id,
      plan_id: req.body.plan_id,
    });
    if (crud.length == 0) {
      return res.status(404).json({ message: "item does not exist" });
    } else {
      res.status(200).json({ crud });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getOrderbyPlan = async (req, res) => {
  try {
    const { planId: crudId } = req.params;
    const crud = await orderDetails.find({
      plan_id: crudId,
    });
    if (crud.length == 0) {
      return res.status(404).json({ message: "item does not exist" });
    } else {
      res.status(200).json({ crud });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getOrderUserPlan = async (req, res) => {
  try {
    //const { planId: crudId } = req.params;
    const crud = await orderDetails.findOne({
      plan_id: req.params.planId,
      user_id: req.params.userId,
    });
    if (crud.length == 0) {
      return res.status(404).json({ message: "item does not exist" });
    } else {
      res.status(200).json({ crud });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getTrainersSale = async (req, res) => {
  try {
    const { trainerId: crudId } = req.params;

    const crud = await orderDetails.find({
      trainer_id: crudId,
    });
    if (crud.length == 0) {
      return res.status(404).json({ message: "item does not exist" });
    } else {
      res.status(200).json({ crud });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const postRevew = async (req, res) => {
  try {
    const order = await orderDetails.findOne({
      _id: req.body.order_id,
    });

    var rating = 0;
    var reviewCount = 0;

    if (!order) {
      return res.status(404).json({ message: "item does not exist" });
    }

    if (order.review) {
      return res.status(404).json({ message: "Already Reviewed" });
    }
    order.review = req.body.review;
    order.review_comment = req.body.review_comment;

    const trainerOrders = await orderDetails.find({
      trainer_id: order.trainer_id,
    });

    trainerOrders.map((e) => {
      if (e.review) {
        rating = rating + e.review;
        reviewCount++;
      }
    });

    rating = rating / reviewCount;

    console.log(trainerOrders);
    console.log(reviewCount);

    let trainer = await trainerDetails.findOne({ _id: order.trainer_id });
    trainer.numReview = rating;
    trainer.countReview = reviewCount;
    await trainerDetails.findByIdAndUpdate(
      { _id: trainer._id },
      { $set: trainer },
      {
        new: true,
        runValidators: true,
      }
    );

    const crud = await orderDetails.findByIdAndUpdate({ _id: order._id }, order, {
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

module.exports = {
  getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  getbyUser,
  checkUserOrder,
  getTrainersSale,
  postRevew,
  getOrderbyPlan,
  getOrderUserPlan,
};
