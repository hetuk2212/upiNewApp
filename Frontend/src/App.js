import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRCodeGenerator from "./QRCodeGenerator/QRCodeGenerator";
import QRCodeDetails from "./QRCodeDetails/QRCodeDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator />} />
        <Route path="/qr-details/:id" element={<QRCodeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
