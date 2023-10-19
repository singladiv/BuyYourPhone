import React from 'react'
import { Link } from 'react-router-dom'
import Newappbar from '../Components/Newappbar'
const AddressDetails = () => {
  return (
    <>
    <Newappbar/> 
    <br/>
    <div>
      <h1>Please Fill in Your Address Details</h1>
      <Link to="/">Place Order</Link>
    </div>
    </>
  )
}

export default AddressDetails
