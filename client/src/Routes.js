import React from "react";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "./Pages/Auth/ChangePassword";
import Timetracker from "./Pages/TimeTracker/Timetracker";

const Routess = () => {
  return (
    <Routes>
      <Route path="/" element={<Timetracker />} />
      <Route path="/change_password" element={<ChangePassword />} />
    </Routes>
  );
};

export default Routess;
