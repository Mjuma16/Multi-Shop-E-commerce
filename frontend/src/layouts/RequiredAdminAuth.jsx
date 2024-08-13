import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAdminAuth({ role }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || (user && role !== user.role)) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}

export default RequiredAdminAuth;
