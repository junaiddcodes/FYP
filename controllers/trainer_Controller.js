const { trainerDetails } = require('../models/trainerDetails')

const createData = async (req, res) => {
  try {
    const crud = await trainerDetails.create(req.body)
    res.status(201).json({ crud })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = {
  createData,
}
