import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../Component/SideBar";

const RoleBaseRoute = () => {
  const role = JSON.parse(localStorage.getItem("user"))?.type;
  console.log(role)
  return localStorage.getItem("user") ? (
    role === "admin" ? (
      <SideBar>
      <Outlet />

      </SideBar>
    ) : (
      <Navigate to={"/blog"} />
    )
  ) : (
    <Navigate to={"/"} />
  );
};

export default RoleBaseRoute;
