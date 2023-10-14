import React from 'react'
import { Link } from 'react-router-dom'
const Acessories = () => {
    return (
        <div>
            <Link to="/order-summary">Skip</Link>
            <h1>Please select your acessories</h1>
            <Link to="/acessories-description">Next</Link>
        </div>
    )
}

export default Acessories
