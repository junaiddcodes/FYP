const router = require('express').Router()
const Conversation = require('../models/Conversation')

//new conv

router.post('/', async (req, res) => {
  try {
    let user = await Conversation.find({
      members: [req.body.senderId, req.body.receiverId],
    })
    // console.log('GET USER', user)
    // console.log('GET USER SENDER', req.body.senderId)
    // console.log('GET USER TRAIER', req.body.receiverId)

    if (user && user.length > 0)
      return res.status(400).send('conversation already exist')
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    })
    // console.log('GET VHAT', newConversation)
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
    console.log('GET CONVO', conversation)
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
