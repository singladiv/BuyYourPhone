import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    </div>
  );
}

export default App;
