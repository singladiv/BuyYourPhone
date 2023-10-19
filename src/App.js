import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressDetails from "./Pages/AddressDetails";
import OrderSummary from "./Pages/OrderSummary";
import AccessoriesDescription from "./Pages/AccessoriesDescription";
import Accessories from "./Pages/Accessories";
import DeviceDetails from "./Pages/DeviceDetails";
import Landing from "./Pages/Landing";
import Appbar from './Components/Appbar';
function App() {
  return (
    <div>
    <Appbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/device-details/:brand/:model" element={<DeviceDetails/>}/>
        <Route path="/accessories/:brand" element={<Accessories/>}/>
        <Route path="/accessories-description" element={<AccessoriesDescription/>}/>
        <Route path="/order-summary" element={<OrderSummary/>}/>
        <Route path="/address-details" element={<AddressDetails/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
