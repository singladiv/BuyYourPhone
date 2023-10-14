import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressDetails from "./Pages/AddressDetails";
import OrderSummary from "./Pages/OrderSummary";
import AcessoriesDescription from "./Pages/AcessoriesDescription";
import Acessories from "./Pages/Acessories";
import DeviceDescription from "./Pages/DeviceDescription";
import Landing from "./Pages/Landing";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/device-description" element={<DeviceDescription/>}/>
        <Route path="/acessories" element={<Acessories/>}/>
        <Route path="/acessories-description" element={<AcessoriesDescription/>}/>
        <Route path="/order-summary" element={<OrderSummary/>}/>
        <Route path="/address-details" element={<AddressDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;