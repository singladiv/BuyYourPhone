import React from 'react'
import { Link } from 'react-router-dom'
const AcessoriesDescription = () => {
  return (
    <div>

      <h1>Here is Your Selected Acessory</h1>
      <Link to="/order-summary">Proceed</Link>
    </div>
  )
}

export default AcessoriesDescription
