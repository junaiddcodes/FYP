import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY =
  'pk_test_51L1NMyAkwQT4XQAq9bBHEkrI1uByQaMSyXZp63IctAz1D0UgHQF8vvOXopoME3DoQqbTwcHq7OlXzpUX3URwi6T1007KG9gwbF'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ amount, action }) {
  return (
    <Elements stripe={stripeTestPromise}>
      <h2>Payment </h2>
      <p className="text-light">You need to pay: {amount} PKR</p>
      <PaymentForm payment={amount} action={action}/>
    </Elements>
  )
}
