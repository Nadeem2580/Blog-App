import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Privateroute = () => {
  return localStorage.getItem("user") ? <Outlet /> :<Navigate to={"/"} />;
};

export default Privateroute;
