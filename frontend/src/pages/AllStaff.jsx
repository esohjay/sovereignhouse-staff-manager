import React, { useEffect } from "react";
import { useGetAllStaffQuery } from "../api/staff/staffApi";
import { Link } from "react-router-dom";
import { selectToken, getUserIdToken } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";

function AllStaff() {
  const dispatch = useDispatch();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllStaffQuery();
  return (
    <article className="w-full overflow-x-scroll rounded-md  scrollbar">
      <table className="w-[1300px]">
        <thead className="">
          <tr className="bg-gray">
            <th className="capitalize p-4 text-left font-semibold w-14">s/n</th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[280px]">
              fullname
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[180px]">
              phone
            </th>
            <th className="capitalize px-2 py-4 font-semibold w-[280px] text-left">
              email
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[110px]">
              gender
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[180px]">
              contract type
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold  w-[180px]">
              job role
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[100px]">
              status
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
              <td className="w-ful text-left px-2 py-3 w-[280px]">
                <p className="mb-1">{staff.fullName}</p>
                <div className="hidden group-hover:flex group-hover:gap-2 w-full">
                  <Link
                    to={`/admin/staff/${staff.id}`}
                    className="text-mainColor p-1 text-xs inline-block rounded-md border border-mainColor fornt-medium capitalize"
                  >
                    view
                  </Link>
                  <Link
                    to={`/admin/staff/${staff.id}/edit`}
                    className="text-mainColor p-1 text-xs inline-block rounded-md border border-yellow-500 fornt-medium capitalize"
                  >
                    edit
                  </Link>
                </div>
              </td>
              <td className="w-ful text-left px-2 py-3 w-[180px]">
                {staff.phone}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[280px]">
                {staff.email}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[110px]">
                {staff.gender}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[180px]">
                {staff.contractType}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[180px]">
                {staff.jobPosition}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[100px]">
                {staff.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default AllStaff;
