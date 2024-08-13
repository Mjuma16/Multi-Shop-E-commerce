import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAuth() {
  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={"/login"} replace={true} />; //replace will stop to go back when route is protected
  }
  return <Outlet />;
}

export default RequiredAuth;
