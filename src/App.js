import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import AddressDetails from "./Pages/AddressDetails/Index";
import OrderSummary from "./Pages/OrderSummary/Index";
import AccessoriesDescription from "./Pages/AccessoriesDescription/Index";
import Accessories from "./Pages/Accessories/Index";
import DeviceDetails from "./Pages/DeviceDetails/Index";
import Landing from "./Pages/Landing/Index";
import Appbar from "./Components/Appbar/Appbar";
function App() {
  return (
    <div>
      <Appbar/>
=======
import AddressDetails from "./Pages/AddressDetails";
import OrderSummary from "./Pages/OrderSummary";
import AccessoriesDescription from "./Pages/AccessoriesDescription";
import Acessories from "./Pages/Acessories";
import DeviceDetails from "./Pages/DeviceDetails";
import Landing from "./Pages/Landing";

function App() {
  return (
   <>
 
>>>>>>> Stashed changes
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/device-details/:brand/:model"
          element={<DeviceDetails />}
        />
        <Route path="/accessories/:brand" element={<Accessories />} />
        <Route
          path="/accessories-description/:brand/:model"
          element={<AccessoriesDescription />}
        />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/address-details" element={<AddressDetails />} />
      </Routes>
    </BrowserRouter>
<<<<<<< Updated upstream
    </div>
=======
    </>
>>>>>>> Stashed changes
  );
}

export default App;
