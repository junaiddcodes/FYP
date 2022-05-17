const router = require('express').Router()
const Conversation = require('../models/Conversation')

//new conv

router.post('/', async (req, res) => {
  try {
    // let user = await conversation.find({
    //   members: [{ 0: req.body.senderId }, { 1: req.body.receiverId }],
    // })

    // if (user) return res.status(400).send('user with given email already exist')
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    })
    const savedConversation = await newConversation.save()
    res.status(200).json(savedConversation)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get conv of a user

router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/', async (req, res) => {
  try {
    let user = await conversation.find({
      // 'members.0': req.body.senderId,
      // 'members.1': req.body.receiverId,
      members: { $in: [req.body.receiverId] },
    })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})
// get conv includes two userId

router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    })
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
