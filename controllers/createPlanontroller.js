const { createPlanModel } = require("../models/create_plan");

// // //use to get all data from db
// const getAllData = async (req, res) => {
//   try {
//     const crud = await foodApiDetails.find({})
//     res.status(200).json({ crud })
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// }
//use to create data in db
const createData = async (req, res) => {
  try {
    const crud = await createPlanModel.create(req.body);
    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// //use to get only one data from db
const getOneData = async (req, res) => {
  try {
    const { planId: crudId } = req.params;
    console.log(req.params);
    // console.log(foodId)
    // console.log(crudId)
    const crud = await createPlanModel.find({ trainer_id: crudId });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }

    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// const getbyName = async (req, res) => {
//   try {
//     const { food: crudId } = req.params
//     console.log(req.params)
//     // console.log(foodId)
//     // console.log(crudId)
//     const crud = await foodApiDetails.findOne({ food_name: crudId })

//     if (!crud) {
//       return res.status(404).json({ message: 'item does not exist' })
//     }

//     res.status(200).json({ crud })
//   } catch (error) {
//     res.status(500).json({ message: error })
//   }
// }

// // //this is use to update user in list
const updateData = async (req, res) => {
  try {
    const crudId = req.params.planId;
    const trainerId = req.params.trainerId;
    req.body.trainer_id = trainerId;
    const crud = await createPlanModel.findByIdAndUpdate({ _id: crudId }, req.body, {
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

// // // delete data from id
const deleteData = async (req, res) => {
  try {
    const { planId: crudId } = req.params;
    const crud = await createPlanModel.findByIdAndDelete({ _id: crudId });

    if (!crud) {
      return res.status(404).json({ message: "item does not exist" });
    }
    res.status(200).json({ crud });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  //   getAllData,
  getOneData,
  updateData,
  deleteData,
  createData,
  //   getbyName,
};
