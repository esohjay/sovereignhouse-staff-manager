import React, { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function AdminRoute() {
  const location = useLocation().pathname;
  const isAdmin = Cookies.get("isAdmin")
    ? JSON.parse(Cookies.get("isAdmin"))
    : null;
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  useEffect(() => {
    if (!user && !isAdmin) {
      <Navigate to="/" state={{ from: location }} replace />;
    }
  }, [user, isAdmin]);
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default AdminRoute;
