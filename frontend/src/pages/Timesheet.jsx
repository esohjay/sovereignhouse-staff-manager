import React, { useState } from "react";
import { useGetStaffQuery } from "../api/staff/staffApi";
import { useRecordClockInMutation } from "../api/shift/shiftApi";
import { useParams, Link } from "react-router-dom";
import { setDay } from "../lib/setDay";

function Timesheet() {
  const { id } = useParams();
  const [clockIn, result] = useRecordClockInMutation();
  const [dayError, setDayError] = useState(false);
  const { currentData } = useGetStaffQuery(id);
  const handleClockIn = (shiftDay) => {
    const date = new Date();
    const today = date.getDay();
    if (today !== shiftDay) {
      setDayError(true);
      return;
    }
    clockIn({
      startTime: date,
    });
  };
  return (
    <article className="p-5 md:p-20">
      <article className=" bg-white rounded-md shadow-md">
        <article>
          <div className="p-3 border-b border-b-mainColor">
            <h3 className="text-center font-semibold text-mainColor capitalize p-3">
              available shifts
            </h3>
          </div>
          {/* Shifts */}
          <table className="w-full">
            <thead className="">
              <tr className="bg-gray">
                <th className="capitalize px-2 py-4 text-left font-semibold w-[280px">
                  title
                </th>
                <th className="capitalize px-2 py-4 text-left font-semibold w-[180px">
                  venue
                </th>
                <th className="capitalize px-2 py-4 font-semibold w-[280px text-left">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData?.shifts?.map((shift) => {
                const day = setDay(shift.dayOfTheWeek);
                return (
                  <tr
                    key={shift.id}
                    className="hover:bg-lightGreen p-3 cursor-pointer group"
                  >
                    <td className=" text-left px-2 py-3">
                      <Link
                        to={`/admin/${id}/shift/${shift.id}`}
                        className="mb-1 text-sm font-semibold"
                      >
                        {shift.title}
                      </Link>

                      <p className="text-xs">
                        &#40;{shift.startTime.substring(0, 5)} to{" "}
                        {shift.endTime.substring(0, 5)}&#41;
                      </p>
                    </td>
                    <td className="text-left px-2 py-3 ">
                      <p className="text-sm">{shift.venue}</p>
                      <p className="text-xs">&#40;{day}&#41;</p>
                    </td>
                    <td className="text-left px-2 py-3">
                      <button
                        onClick={() => handleClockIn(shift.dayOfTheWeek)}
                        className="inline-block capitalize bg-mainColor text-sm text-white px-3 py-1 rounded-md"
                      >
                        clock in
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
      </article>
    </article>
  );
}

export default Timesheet;
