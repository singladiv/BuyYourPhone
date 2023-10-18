import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressDetails from "./Pages/AddressDetails";
import OrderSummary from "./Pages/OrderSummary";
import AccessoriesDescription from "./Pages/AccessoriesDescription";
import Acessories from "./Pages/Acessories";
import DeviceDetails from "./Pages/DeviceDetails";
import Landing from "./Pages/Landing";
function App() {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/device-details/:brand/:model" element={<DeviceDetails/>}/>
        <Route path="/acessories" element={<Acessories/>}/>
        <Route path="/accessories-description" element={<AccessoriesDescription/>}/>
        <Route path="/order-summary" element={<OrderSummary/>}/>
        <Route path="/address-details" element={<AddressDetails/>}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
