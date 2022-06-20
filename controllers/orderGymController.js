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
    const crud = await orderGymDetails.find({ user_id: crudId });
    var tempArr =[]


    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }

    console.log(crud);

    crud.map((e)=>{
      tempArr.push(e.gym_id)
    })

    var plans = await gymDetails.find({
      _id: tempArr,
    });

    console.log(plans)

    res.status(200).json({ plans });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getGymSale = async (req, res) => {
  try {
    const { gymId: crudId } = req.params;

    const crud = await orderGymDetails.find({
      gym_id: crudId,
    }).populate({
      path:"user_id",
      model:"Customer_Details",
      select:"user_id.full_name"
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
const withdrawRequest = async (req, res) => {
  try {
    const withdraw = await orderGymDetails.find({
      gym_id: req.params.gym_id,
    });
    let price = 0;

    if (withdraw.length == 0) {
      return res
        .status(404)
        .json({ message: "Trainer dont have any payment yet" });
    }

    withdraw.map((e) => {
      if (e.withdraw) {
        price = price + e.price;
      }
    });
    if (price == 0) {
      return res
        .status(404)
        .json({ message: "Not have any amount to withdraw" });
    }

    res.status(200).json({ amount: price });
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
    getbyUser,
    getGymSale,
    withdrawRequest
  };


  
  
