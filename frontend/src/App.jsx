import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Hrm from "./pages/hrm/Hrm";
import NewStaff from "./pages/hrm/NewStaff";
import AllStaff from "./pages/hrm/AllStaff";
import Profile from "./pages/hrm/Profile";
import UpdateStaff from "./pages/hrm/UpdateStaff";

import Recruitment from "./pages/campaign/Recruitment";
import AddCampaign from "./pages/campaign/AddCampaign";
import Campaigns from "./pages/campaign/Campaigns";
import CampaignDetails from "./pages/campaign/CampaignDetails";
import AddShift from "./pages/AddShift";
import Shift from "./pages/Shift";
import ShiftList from "./pages/ShiftList";
import ShiftDetails from "./pages/ShiftDetails";
import Timesheet from "./pages/timesheet/Timesheet";
import AllStaffTimesheets from "./pages/timesheet/AllStaffTimesheets";
import RequestLeave from "./pages/leave/RequestLeave";
import LeaveContainer from "./pages/leave/LeaveContainer";
import LeaveDetails from "./pages/leave/LeaveDetails";
import EditLeave from "./pages/leave/EditLeave";
import AllLeaveRequests from "./pages/leave/AllLeaveRequests";
import Task from "./pages/task/TaskContainer";
import NewTask from "./pages/task/NewTask";
import AllUserTasks from "./pages/task/AllUserTasks";
import TaskDetails from "./pages/task/TaskDeatils";

import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/401";
import AdminRoute from "./components/AdminRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Landing />}>
        <Route path="vms/:id" element={<Home />}>
          <Route element={<ProtectedRoute />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="leave" element={<LeaveContainer />}>
              <Route path="request" element={<RequestLeave />} />
              <Route path=":leaveId" element={<LeaveDetails />} />
              <Route path=":leaveId/edit" element={<EditLeave />} />
            </Route>
            <Route path="profile" element={<Profile />}>
              <Route path="request" element={<UpdateStaff />} />
            </Route>
            <Route path="task" element={<Task />}>
              <Route index element={<AllUserTasks />} />
              <Route path="add" element={<NewTask />} />
              <Route path=":taskId" element={<TaskDetails />} />
            </Route>

            {/* Admin views */}
            <Route path="admin" element={<AdminRoute />}>
              <Route path="timesheet/:userId" element={<Timesheet />} />
              <Route
                path="all-staff-timesheets"
                element={<AllStaffTimesheets />}
              />

              <Route path="leave" element={<LeaveContainer />}>
                <Route path="request" element={<RequestLeave />} />
                <Route path=":leaveId" element={<LeaveDetails />} />
                <Route path=":leaveId/edit" element={<EditLeave />} />
                <Route index element={<AllLeaveRequests />} />
              </Route>
              <Route path="staff" element={<Hrm />}>
                <Route path="add" element={<NewStaff />} />
                <Route path=":userId" element={<Profile />} />
                <Route path=":userId/edit" element={<UpdateStaff />} />
                <Route index element={<AllStaff />} />
              </Route>
              <Route path="recruitment" element={<Recruitment />}>
                <Route path="add" element={<AddCampaign />} />
                <Route path=":campaignId" element={<CampaignDetails />} />
                <Route index element={<Campaigns />} />
              </Route>
              <Route path="shift" element={<Shift />}>
                <Route path="add" element={<AddShift />} />
                <Route index element={<ShiftList />} />
                <Route path=":shiftId" element={<ShiftDetails />} />
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
