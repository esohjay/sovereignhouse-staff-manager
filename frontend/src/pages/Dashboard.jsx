import React, { useState, useEffect } from "react";

import { useGetAllShiftQuery } from "../api/shift/shiftApi";
import { useGetAllStaffQuery } from "../api/staff/staffApi";
import { useGetLeaveRequestsQuery } from "../api/leave/leaveApi";
import { useGetCampaignsQuery } from "../api/recruitment/campaignApi";

function Dashboard() {
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllStaffQuery();
  const [volunteers, setVolunteers] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [interns, setInterns] = useState([]);
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
  }, [currentData]);

  return (
    <section className="p-5">
      <article className="w-60 h-40 bg-white rounded-md shadow-md p-3 mb-3">
        <div className="flex items-baseline gap-x-1">
          <p className="text-6xl font-bold text-mainColor">
            {currentData?.length}
          </p>
          <p className="text-base">
            Staff {currentData?.length > 0 ? "members" : "member"}
          </p>
        </div>
        <div className="flex gap-x-1 items-baseline">
          <p className="font-semibold text-2xl text-mainColor">
            {volunteers?.length}
          </p>
          <p className="text-sm text-mainColor">
            {volunteers?.length > 0 ? "Volunteers" : "Volunteer"}
          </p>
        </div>
        <div className="flex gap-x-1 items-baseline">
          <p className="font-semibold text-2xl text-mainColor">
            {employee?.length}
          </p>
          <p className="text-sm text-mainColor">
            {employee?.length > 0 ? "Employees" : "Employee"}
          </p>
        </div>
        <div className="flex gap-x-1 items-baseline">
          <p className="font-semibold text-2xl text-mainColor">
            {interns?.length}
          </p>
          <p className="text-sm text-mainColor">
            {interns?.length > 0 ? "Interns" : "Intern"}
          </p>
        </div>
      </article>
    </section>
    // <article className="h-64 bg-white min-h-screen grid grid-cols-[2fr_1fr] gap-x-5 p-5">
    //   <article className="w-full bg-gray h-96 rounded-md shadow-lg">
    //     <div>
    //       <p>my task</p>
    //     </div>
    //   </article>
    //   <article className="w-full h-6 bg-red-50"></article>
    // </article>
  );
}

export default Dashboard;
