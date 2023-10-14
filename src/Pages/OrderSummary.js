import React from 'react'
import { Link } from 'react-router-dom'
const OrderSummary = () => {
  return (
    <div>
      <h1>Your Order Summary is: </h1>
      <Link to="/address-details">Proceed Further</Link>
    </div>
  )
}

export default OrderSummary
