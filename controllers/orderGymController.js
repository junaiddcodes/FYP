const { orderGymDetails } = require("../models/orderGymDetails");
const { gymDetails } = require("../models/gym_details");

// //use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await orderGymDetails.find({});
    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//use to create data in db
const createData = async (req, res) => {
  try {
    var gym = await gymDetails.findOne({ _id: req.body.gym_id });

    if (!gym) {
      return res.status(404).json({ message: "Gym does not exist" });
    }

    const checkPlan = await orderGymDetails.find({
      user_id: req.body.user_id,
      gym_id: req.body.gym_id,
    });

    console.log(checkPlan);

    if (checkPlan.length != 0) {
      return res.status(404).json({ message: "User already have Membership" });
    }
    const crud = await orderGymDetails.create(req.body);
    res.status(201).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// //this is use to update user in list
const updateData = async (req, res) => {
    try {
      const { orderId: crudId } = req.params;
      const crud = await orderGymDetails.findByIdAndUpdate(
        { _id: crudId },
        {$set:req.body},
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


  //use to get only one data from db
const getOneData = async (req, res) => {
    try {
      const { orderId: crudId } = req.params;
      const crud = await orderGymDetails.findOne({ _id: crudId });
  
      if (!crud) {
        return res.status(404).json({ message: "item does not exist" });
      }
  
      res.status(200).json({ crud });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  //use to get only one data from db
const getOrderCheck = async (req, res) => {
    try {
    //   const { gymId: crudId } = req.params;
      const crud = await orderGymDetails.findOne({ user_id: req.params.userId , gym_id: req.params.gymId });
  
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
    
    const { userId: crudId } = req.params;
    const crud = await orderGymDetails.findOne({ user_id: crudId });



    console.log(crud);

    var plans = await gymDetails.findOne({
      _id: crud.gym_id,
    });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }
    console.log(plans)

    res.status(200).json({ plans });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

  module.exports = {
    getAllData,
    getOneData,
    updateData,
    createData,
    getOrderCheck,
    getbyUser
  };


  
  
