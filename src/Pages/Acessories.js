import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Newappbar from "../Components/Newappbar";

const Accessories = () => {
  const [distance, setDistance] = useState(null);

  return (
    <>
    <Newappbar/><br/>
    <div>
      <Link to="/order-summary">Skip</Link>
      <h1>Please select your accessories</h1>
      <Link to="/accessories-description">Next</Link>
    </div>
    </>
  );
};

export default Accessories;
