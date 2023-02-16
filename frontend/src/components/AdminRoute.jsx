import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function AdminRoute() {
  const location = useLocation().pathname;
  const isAdmin = Cookies.get("isAdmin")
    ? JSON.parse(Cookies.get("isAdmin"))
    : null;
  console.log(isAdmin);
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default AdminRoute;
