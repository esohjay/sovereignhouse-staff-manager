import React, { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Hrm from "./pages/Hrm";
import NewStaff from "./pages/NewStaff";
import AllStaff from "./pages/AllStaff";
import Recruitment from "./pages/Recruitment";
import AddCampaign from "./pages/AddCampaign";
import Campaigns from "./pages/Campaigns";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/401";
import AdminRoute from "./components/AdminRoute";

function App() {
  const { user } = useAuth();
  // const location = useLocation();
  // const navigate = useNavigate();
  console.log(user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Landing />}>
        <Route path="admin" element={<Home />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route element={<AdminRoute />}>
              <Route path="staff" element={<Hrm />}>
                <Route path="add" element={<NewStaff />} />
                <Route index element={<AllStaff />} />
              </Route>
              <Route path="recruitment" element={<Recruitment />}>
                <Route path="add" element={<AddCampaign />} />
                <Route index element={<Campaigns />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    )
  );
  return (
    // <main>
    //   <Outlet />
    // </main>
    <RouterProvider router={router} />
  );
}

export default App;
