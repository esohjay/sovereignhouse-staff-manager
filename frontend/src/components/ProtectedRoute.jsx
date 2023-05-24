import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute() {
  const location = useLocation().pathname;
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
