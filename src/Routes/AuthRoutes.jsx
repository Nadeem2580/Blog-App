import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = () => {
  return (
    !localStorage.getItem("user")? <Outlet /> :<Navigate to={"/blog"} />
  )
}

export default AuthRoutes