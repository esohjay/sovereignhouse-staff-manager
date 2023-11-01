import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
import AddKB from "./pages/knowledge-base/AddKB";
import EditKB from "./pages/knowledge-base/EditKB";

import Recruitment from "./pages/campaign/Recruitment";
import AddCampaign from "./pages/campaign/AddCampaign";
import Campaigns from "./pages/campaign/Campaigns";
import Application from "./pages/campaign/Application";
import ApplicantDetails from "./pages/campaign/ApplicantDetails";
import ApplicationList from "./pages/campaign/ApplicationList";
import CampaignDetails from "./pages/campaign/CampaignDetails";
import EditCampaign from "./pages/campaign/EditCampaign";
import AddShift from "./pages/shift/AddShift";
import Shift from "./pages/shift/Shift";
import ShiftList from "./pages/shift/ShiftList";
import ShiftDetails from "./pages/shift/ShiftDetails";
import EditShift from "./pages/shift/EditShift";
import Timesheet from "./pages/timesheet/Timesheet";
import AllStaffTimesheets from "./pages/timesheet/AllStaffTimesheets";
import RequestLeave from "./pages/leave/RequestLeave";
import AddStaffLeave from "./pages/leave/AddStaffLeave";
import LeaveContainer from "./pages/leave/LeaveContainer";
import LeaveDetails from "./pages/leave/LeaveDetails";
import LeavereRequest from "./pages/leave/LeavereRequest";
import EditLeave from "./pages/leave/EditLeave";
import AllLeaveRequests from "./pages/leave/AllLeaveRequests";
import Task from "./pages/task/TaskContainer";
import NewTask from "./pages/task/NewTask";
import AllUserTasks from "./pages/task/AllUserTasks";
import EditTask from "./pages/task/EditTask";
import TaskDetails from "./pages/task/TaskDeatils";

import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/401";
import AdminRoute from "./components/AdminRoute";
import KnowledgeBase from "./pages/knowledge-base/KnowledgeBase";

import ExpensesContainer from "./pages/expenses/ExpensesContainer";
import AddExpense from "./pages/expenses/AddExpense";
import AllExpenses from "./pages/expenses/AllExpenses";
import ExpenseDetails from "./pages/expenses/ExpenseDetails";
import EditExpense from "./pages/expenses/EditExpense";

import BuryForm from "./pages/student-application/BuryForm";
import StudentApplication from "./pages/student-application/StudentApplication";
import StudentApplicationList from "./pages/student-application/ApplicationList";
import StudentApplicantDetails from "./pages/student-application/ApplicationDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Landing />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="clp/bury" element={<BuryForm />}></Route>

        <Route path="vms/:id" element={<Home />}>
          <Route element={<ProtectedRoute />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="knowledge-base/add" element={<AddKB />} />
            <Route path="knowledge-base/:kbId/edit" element={<EditKB />} />
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<UpdateStaff />} />
            <Route path="leave" element={<LeaveContainer />}>
              <Route index element={<LeavereRequest />} />
              <Route path="request" element={<RequestLeave />} />
              <Route path=":leaveId" element={<LeaveDetails />} />
              <Route path=":leaveId/edit" element={<EditLeave />} />
            </Route>

            <Route path="task" element={<Task />}>
              <Route index element={<AllUserTasks />} />
              <Route path="add" element={<NewTask />} />
              <Route path=":taskId" element={<TaskDetails />} />
              <Route path=":taskId/edit" element={<EditTask />} />
            </Route>
            <Route path="expenses" element={<ExpensesContainer />}>
              <Route path="add" element={<AddExpense />} />
              <Route path=":expenseId" element={<ExpenseDetails />} />
              <Route path=":expenseId/edit" element={<EditExpense />} />
              <Route index element={<AllExpenses />} />
            </Route>

            {/* Admin views */}
            <Route path="admin" element={<AdminRoute />}>
              <Route path="timesheet/:userId" element={<Timesheet />} />
              <Route
                path="all-staff-timesheets"
                element={<AllStaffTimesheets />}
              />
              {/* Leave */}
              <Route path="leave" element={<LeaveContainer />}>
                <Route path="request" element={<RequestLeave />} />
                <Route path="add" element={<AddStaffLeave />} />
                <Route path=":leaveId" element={<LeaveDetails />} />
                <Route path=":leaveId/edit" element={<EditLeave />} />
                <Route index element={<AllLeaveRequests />} />
              </Route>
              {/* Staff */}
              <Route path="staff" element={<Hrm />}>
                <Route path="add" element={<NewStaff />} />
                <Route path=":userId" element={<Profile />} />
                <Route path=":userId/edit" element={<UpdateStaff />} />
                <Route index element={<AllStaff />} />
              </Route>
              {/* Application */}
              <Route
                path="students-application"
                element={<StudentApplication />}
              >
                <Route index element={<StudentApplicationList />} />
                <Route
                  path=":studentId"
                  element={<StudentApplicantDetails />}
                />
              </Route>
              {/* Campaign */}
              <Route path="recruitment" element={<Recruitment />}>
                <Route path="add" element={<AddCampaign />} />
                <Route path="applicant/all" element={<ApplicationList />} />
                <Route
                  path="applicant/all/:applicantId"
                  element={<ApplicantDetails />}
                />
                <Route path=":campaignId" element={<CampaignDetails />} />
                <Route path=":campaignId/edit" element={<EditCampaign />} />
                <Route index element={<Campaigns />} />
              </Route>
              {/* Shift */}
              <Route path="shift" element={<Shift />}>
                <Route path="add" element={<AddShift />} />
                <Route index element={<ShiftList />} />
                <Route path=":shiftId" element={<ShiftDetails />} />
                <Route path=":shiftId/edit" element={<EditShift />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* <Route path="register" element={<Register />} /> */}

        <Route path=":campaign/apply" element={<Application />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    )
  );
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
