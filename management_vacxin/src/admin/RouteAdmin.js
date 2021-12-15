import React from "react";
import Home from "./Home.js";
import { Route, Routes } from "react-router-dom";

function RouteAdmin() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default RouteAdmin;
