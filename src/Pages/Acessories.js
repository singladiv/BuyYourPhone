import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Accessories = () => {
  const [distance, setDistance] = useState(null);

  return (
    <div>
      

      <Link to="/order-summary">Skip</Link>
      <h1>Please select your accessories</h1>
      <Link to="/accessories-description">Next</Link>
    </div>
  );
};

export default Accessories;
