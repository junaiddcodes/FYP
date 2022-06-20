const { withdrawDetails } = require("../models/withdrawApprove");
const { orderGymDetails } = require("../models/orderGymDetails");
const { orderDetails } = require("../models/orderDetails");

// //use to get all data from db
const getAllData = async (req, res) => {
  try {
    const crud = await withdrawDetails.find({ payment_processed: false });
    console.log(crud);

    if (crud.length == 0) {
      return res.status(400).send("Payment request not exist");
    }

    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//use to create data in db
const createData = async (req, res) => {
  try {
    let user_type;

    if (req.body.user_type == "trainer") {
      user_type = await orderDetails.find({
        trainer_id: req.body.user_id,
        withdraw: true,
      });
    }else if (req.body.user_type == "gym") {
        user_type = await orderGymDetails.find({
          trainer_id: req.body.user_id,
          withdraw: true,
        });
      }
    if (user_type.length == 0) {
      return res.status(400).send("User dont have any amount to withdraw");
    }

    var tempVar = 0;
    user_type.map((e) => {
      tempVar = tempVar + e.price;
    });

    if (tempVar != req.body.amount) {
      return res.status(400).send("Withdraw amount is Wrong");
    }
    let user = await withdrawDetails.findOne({
      // user_id: { email: req.body.user_id.email },
      user_id: req.body.user_id,
      user_type: req.body.user_type,
      payment_processed: false,
    });

    if (user)
      return res.status(400).send("User Already opened withdraw Request");

    const crud = await withdrawDetails.create(req.body);

    // let email1 = crud.user_id.email

    res.status(200).json({ crud });
    //console.log(crud)
    // res.send(_.pick(crud));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { withdrawId: crudId } = req.params;
    const crud = await withdrawDetails.findOne({ _id: crudId });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }

    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//this is use to update user in list
const updateData = async (req, res) => {
  try {
    const { withdrawId: crudId } = req.params;
    console.log(req.body)
    if (req.body.amount < 10000) {
      return res
        .status(404)
        .json({ message: "Amount Should be great than Rs 10000" });
    }
    const crud = await withdrawDetails.findByIdAndUpdate(
      { _id: crudId },
      { $set: {payment_processed: true} },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!crud) {
        return res.status(404).json({ message: "item does not exist" });
      }

    if (req.body.use_type == "trainer") {
      const update = await orderDetails.updateMany(
        {
          trainer_id: req.body.user_id,
          withdraw: true,
        },
        {
          $set: { withdraw: false },
        }
      );
      console.log(update)
    } else if(req.body.use_type == "gym") {
        const update = await orderGymDetails.updateMany(
          {
            gym_id: req.body.user_id,
            withdraw: true,
          },
          {
            $set: { withdraw: false },
          }
        );
        console.log(update)
      }



    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllData,
  updateData,
  createData,
  getOneData,
};
