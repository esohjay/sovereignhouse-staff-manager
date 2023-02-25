import React, { useEffect } from "react";
import { useGetAllStaffQuery } from "../api/staff/staffApi";
import { useNavigate, useParams } from "react-router-dom";
import { selectToken, getUserIdToken } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";

function AllStaffTimesheets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllStaffQuery();
  return (
    <article className="w-full p-5 md:p-10">
      <article className="w-full bg-white  rounded-md shadow-md">
        <table className="w-full table-auto ">
          <thead className="">
            <tr className="bg-gray">
              <th className="capitalize p-4 text-left font-semibold w-14">
                s/n
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold ">
                fullname
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold ">
                contract type
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                job role
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((staff, i) => (
              <tr
                key={staff.id}
                className="hover:bg-lightGreen p-3 cursor-pointer group"
              >
                <td className="w-ful text-left p-4 w-14">{i + 1}</td>
                <td className="w-ful text-left px-2 py-3 ">{staff.fullName}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  {staff.contractType}
                </td>
                <td className="w-ful text-left px-2 py-3 ">
                  {staff.jobPosition}
                </td>
                <td className="w-ful text-left px-2 py-3 ">
                  <div className="flex gap-x-2">
                    <button
                      onClick={() =>
                        navigate(`/vms/${id}/admin/timesheet/${staff.id}`)
                      }
                      className="inline-block p-1 rounded-md bg-mainColor text-white text-xs"
                    >
                      Timesheet
                    </button>
                    <button
                      className="inline-block py-1 px-2 rounded-md bg-lightGreen text-mainColor text-xs
                    border border-mainColor"
                    >
                      Leave
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </article>
  );
}

export default AllStaffTimesheets;
