import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate(`/login?from=${location.pathname}`);
  //   }
  // }, [user]);
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
