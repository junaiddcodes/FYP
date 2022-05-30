const router = require('express').Router()
var config = require('config')
const stripe = require('stripe')(config.get('STRIPE_SECRET_TEST'))

const cors = require('cors')

// app.use(cors())

router.post('/', async (req, res) => {
  let { amount, id , description} = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: description,
      payment_method: id,
      confirm: true,
    })
    console.log('Payment', payment)
    res.json({
      message: 'Payment successful',
      success: true,
    })
  } catch (error) {
    console.log('Error', error)
    res.json({
      message: 'Payment failed',
      success: false,
    })
  }
})

module.exports = router

// app.listen(process.env.PORT || 4000, () => {
//   console.log('Sever is listening on port 4000')
// })
