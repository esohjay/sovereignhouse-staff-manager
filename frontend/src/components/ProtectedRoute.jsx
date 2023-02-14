import React, { useState, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth } from "../config/firebase";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const { user: yk } = useAuth();
  const location = useLocation().pathname;
  const currentUser = auth.currentUser;
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const userq = Cookies.get("token") ? Cookies.get("token") : null;
  console.log(currentUser);
  console.log(user);
  console.log(userq);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setCheckComplete(true);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // });
  // // if (!user) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
