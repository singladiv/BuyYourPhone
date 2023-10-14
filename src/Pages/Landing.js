import React from 'react'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <div>
      <h1>Welcome to Landing Page</h1>
        <Link to="/device-description">Next</Link>
    </div>
  )
}

export default Landing
