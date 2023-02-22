import React from "react";
import { useGetAllShiftQuery } from "../api/shift/shiftApi";
import { Link, useParams } from "react-router-dom";

function ShiftList() {
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllShiftQuery();
  return (
    <article className="w-full overflow-x-scroll  md:overflow-x-hidden rounded-md  scrollbar">
      <table className="w-full">
        <thead className="">
          <tr className="bg-gray">
            <th className="capitalize p-4 text-left font-semibold w-1">s/n</th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[280px">
              title
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[180px">
              venue
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[180px">
              week day
            </th>
            <th className="capitalize px-2 py-4 font-semibold w-[280px text-left">
              student category
            </th>
            <th className="capitalize px-2 py-4 font-semibold w-[280px text-left">
              duration
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((shift, i) => (
            <tr
              key={shift.id}
              className="hover:bg-lightGreen p-3 cursor-pointer group"
            >
              <td className="w-ful text-left p-4 -14">{i + 1}</td>
              <td className="w-ful text-left px-2 py-3 w-[280px">
                <p className="mb-1">{shift.title}</p>
                <div className="hidden group-hover:flex group-hover:gap-2 w-full">
                  <Link
                    to={`/admin/${id}/shift/${shift.id}`}
                    className="text-mainColor p-1 text-xs inline-block rounded-md border border-mainColor fornt-medium capitalize"
                  >
                    view
                  </Link>
                  <Link
                    to={`/admin/${id}/shift/${shift.id}/edit`}
                    className="text-mainColor p-1 text-xs inline-block rounded-md border border-yellow-500 fornt-medium capitalize"
                  >
                    edit
                  </Link>
                </div>
              </td>
              <td className="w-ful text-left px-2 py-3 w-[180px">
                {shift.venue}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[180px">
                {shift.dayOfTheWeek}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[280px">
                {shift.studentCategory}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[280px">
                {shift.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default ShiftList;
