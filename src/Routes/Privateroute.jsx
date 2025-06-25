import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";

const Privateroute = () => {
  const role =JSON.parse( localStorage.getItem("user"))?.type;
  return localStorage.getItem("user") ? (
    role === "user" ? (
      <Navbar>
      <Outlet />
      </Navbar>


    ) : (
      <Navigate to={"/adminDashboard/Dashboard"} />
    )
  ) : (
    <Navigate to={"/"} />
  );
};

export default Privateroute;
