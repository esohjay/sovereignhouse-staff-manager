import React, { useState, useEffect } from "react";

import { useGetAllShiftQuery } from "../api/shift/shiftApi";
import { useGetAllStaffQuery } from "../api/staff/staffApi";
import { useGetLeaveRequestsQuery } from "../api/leave/leaveApi";
import { useGetCampaignsQuery } from "../api/recruitment/campaignApi";

import { HiUserGroup } from "react-icons/hi";
import { MdOutlineEventBusy, MdPendingActions } from "react-icons/md";

function Dashboard() {
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllStaffQuery();
  const { currentData: leaveData } = useGetLeaveRequestsQuery();
  const [volunteers, setVolunteers] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [interns, setInterns] = useState([]);

  const [leaveApproved, setLeaveApproved] = useState([]);
  const [leavePending, setLeavePending] = useState([]);
  useEffect(() => {
    setVolunteers(
      currentData?.filter((staff) => staff.contractType === "volunteer")
    );
    setEmployee(
      currentData?.filter((staff) => staff.contractType === "employee")
    );
    setInterns(
      currentData?.filter((staff) => staff.contractType === "internship")
    );
    setLeaveApproved(leaveData?.filter((leave) => leave.status === "approved"));
    setLeavePending(leaveData?.filter((leave) => leave.status === "pending"));
  }, [currentData, leaveData]);

  return (
    <section className="p-5 grid grid-cols-2 gap-3">
      {/* User */}
      <article className="w-60 h-40 bg-white rounded-md shadow-md p-3 mb-3">
        <button className="text-white bg-mainColor font-semibold p-2 text-lg rounded-md mb-3">
          <HiUserGroup />
        </button>
        <p className="text-4xl font-bold text-mainColor">
          {currentData?.length}
        </p>
        <p className="text-base text-altColor mb-3">
          Staff {currentData?.length > 1 ? "members" : "member"}
        </p>
        <div className="flex items-center gap-x-2">
          <div className="flex gap-x-1 items-baseline">
            <p className="font-semibold text-xs text-mainColor">
              {volunteers?.length}
            </p>
            <p className="text-xs text-mainColor">
              {volunteers?.length > 1 ? "Volunteers" : "Volunteer"}
            </p>
          </div>
          <div className="h-3 border-l"></div>
          <div className="flex gap-x-1">
            <p className="font-semibold text-xs text-mainColor">
              {employee?.length}
            </p>
            <p className="text-xs text-mainColor">
              {employee?.length > 0 ? "Employees" : "Employee"}
            </p>
          </div>
        </div>
      </article>
      {/* Leave requests */}
      <article className="w-60 h-40 bg-white rounded-md shadow-md p-3 mb-3">
        <button className="text-white bg-mainColor font-semibold p-2 text-lg rounded-md mb-3">
          <MdOutlineEventBusy />
        </button>
        <p className="text-4xl font-bold text-mainColor">{leaveData?.length}</p>
        <p className="text-base text-altColor mb-3">
          Leave {leaveData?.length > 1 ? "requests" : "request"}
        </p>
        <div className="flex items-center gap-x-2">
          <p className="font-semibold text-xs text-mainColor">
            {leaveApproved?.length} approved
          </p>
          <div className="h-3 border-l"></div>
          <p className="font-semibold text-xs text-mainColor">
            {leavePending?.length} pending
          </p>
        </div>
      </article>
      {/* SHifts */}
      <article className="w-60 h-40 bg-white rounded-md shadow-md p-3 mb-3">
        <button className="text-white bg-mainColor font-semibold p-2 text-lg rounded-md mb-3">
          <MdPendingActions />
        </button>
        <p className="text-4xl font-bold text-mainColor">
          {currentData?.length}
        </p>
        <p className="text-base text-altColor mb-3">
          Shift {currentData?.length > 0 ? "members" : "member"}
        </p>
        <div className="flex items-center gap-x-2">
          <div className="flex gap-x-1 items-baseline">
            <p className="font-semibold text-xs text-mainColor">
              {volunteers?.length}
            </p>
            <p className="text-xs text-mainColor">
              {volunteers?.length > 0 ? "Volunteers" : "Volunteer"}
            </p>
          </div>
          <div className="h-3 border-l"></div>
          <div className="flex gap-x-1">
            <p className="font-semibold text-xs text-mainColor">
              {employee?.length}
            </p>
            <p className="text-xs text-mainColor">
              {employee?.length > 0 ? "Employees" : "Employee"}
            </p>
          </div>
        </div>
      </article>
      {/* Applications */}
      <article className="w-60 h-40 bg-white rounded-md shadow-md p-3 mb-3">
        <button className="text-white bg-mainColor font-semibold p-2 text-lg rounded-md mb-3">
          <HiUserGroup />
        </button>
        <p className="text-4xl font-bold text-mainColor">
          {currentData?.length}
        </p>
        <p className="text-base text-altColor mb-3">
          Staff {currentData?.length > 0 ? "members" : "member"}
        </p>
        <div className="flex items-center gap-x-2">
          <div className="flex gap-x-1 items-baseline">
            <p className="font-semibold text-xs text-mainColor">
              {volunteers?.length}
            </p>
            <p className="text-xs text-mainColor">
              {volunteers?.length > 0 ? "Volunteers" : "Volunteer"}
            </p>
          </div>
          <div className="h-3 border-l"></div>
          <div className="flex gap-x-1">
            <p className="font-semibold text-xs text-mainColor">
              {employee?.length}
            </p>
            <p className="text-xs text-mainColor">
              {employee?.length > 0 ? "Employees" : "Employee"}
            </p>
          </div>
        </div>
      </article>
      {/* Tasks */}
      <article className="w-60 h-40 bg-white rounded-md shadow-md p-3 mb-3">
        <button className="text-white bg-mainColor font-semibold p-2 text-lg rounded-md mb-3">
          <HiUserGroup />
        </button>
        <p className="text-4xl font-bold text-mainColor">
          {currentData?.length}
        </p>
        <p className="text-base text-altColor mb-3">
          Staff {currentData?.length > 0 ? "members" : "member"}
        </p>
        <div className="flex items-center gap-x-2">
          <div className="flex gap-x-1 items-baseline">
            <p className="font-semibold text-xs text-mainColor">
              {volunteers?.length}
            </p>
            <p className="text-xs text-mainColor">
              {volunteers?.length > 0 ? "Volunteers" : "Volunteer"}
            </p>
          </div>
          <div className="h-3 border-l"></div>
          <div className="flex gap-x-1">
            <p className="font-semibold text-xs text-mainColor">
              {employee?.length}
            </p>
            <p className="text-xs text-mainColor">
              {employee?.length > 0 ? "Employees" : "Employee"}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Dashboard;
