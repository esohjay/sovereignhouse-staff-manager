import React, { useState } from "react";
import { useGetStaffQuery } from "../api/staff/staffApi";
import {
  useRecordClockInMutation,
  useGetUserTimesheetQuery,
  useEndShiftMutation,
} from "../api/shift/shiftApi";
import { useParams, Link } from "react-router-dom";
import { setDay, formatDate } from "../lib/setDay";

function Timesheet() {
  const { id } = useParams();
  const [clockIn, result] = useRecordClockInMutation();
  const [clockOut, clockResult] = useEndShiftMutation();
  const [clockInError, setClockInError] = useState("");
  const { currentData } = useGetStaffQuery(id);
  const { currentData: userTimesheet } = useGetUserTimesheetQuery(id);
  console.log(userTimesheet);
  const handleClockIn = (shiftDay, shiftId) => {
    const date = new Date();
    const today = date.getDay();
    if (today !== shiftDay) {
      setClockInError("You can only clock in on the assigned day");
      return;
    }
    if (
      currentData?.timesheets?.length &&
      !currentData?.timesheets[0].endTime
    ) {
      setClockInError("You have a shift in progress");
      return;
    }
    if (currentData?.timesheets?.length) {
      const shifts = currentData?.timesheets?.filter(
        (timesheet) => timesheet.shiftId === shiftId
      );
      console.log(shifts);
      const now = formatDate(date);
      const latestTimesheet = formatDate(
        new Date(`${shifts[shifts.length - 1]?.startTime}`)
      );
      console.log(latestTimesheet);
      const isEqual = Date.parse(now) === Date.parse(latestTimesheet);
      console.log(isEqual);
      if (isEqual) {
        setClockInError("Sorry you cannot clock in twice");
        return;
      }
    }
    clockIn({
      startTime: date,
      shiftId,
      userId: id,
    });
  };
  console.log(clockInError);
  return (
    <article className="p-5 md:p-20">
      <article className=" bg-white rounded-md shadow-md">
        <article className="mb-7">
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
                    <td className=" text-left first-letter:uppercase px-2 py-3">
                      <Link
                        to={`/admin/${id}/shift/${shift.id}`}
                        className="mb-1 text-sm font-semibold "
                      >
                        {shift.title}
                      </Link>

                      <p className="text-xs">
                        &#40;{shift.startTime.substring(0, 5)} to{" "}
                        {shift.endTime.substring(0, 5)}&#41;
                      </p>
                    </td>
                    <td className="text-left px-2 py-3 ">
                      <p className="text-sm first-letter:uppercase">
                        {shift.venue}
                      </p>
                      <p className="text-xs">&#40;{day}&#41;</p>
                    </td>
                    <td className="text-left px-2 py-3">
                      <button
                        onClick={() =>
                          handleClockIn(shift.dayOfTheWeek, shift.id)
                        }
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
        <article className="mb-7">
          <div className="p-3 border-b border-b-mainColor">
            <h3 className="text-center font-semibold text-mainColor capitalize p-3">
              timesheets
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
                  started at
                </th>
                <th className="capitalize px-2 py-4 font-semibold w-[280px text-left">
                  ended at
                </th>
              </tr>
            </thead>
            <tbody>
              {userTimesheet?.map((timesheet) => {
                return (
                  <tr
                    key={timesheet.id}
                    className="hover:bg-lightGreen p-3 cursor-pointer group"
                  >
                    <td className=" text-left px-2 py-3 first-letter:uppercase">
                      <Link
                        to={`/admin/${id}/timesheet/${timesheet.id}`}
                        className="mb-1 text-sm font-semibold"
                      >
                        {timesheet.shift.title}
                      </Link>
                    </td>
                    <td className="text-left px-2 py-3 ">
                      <p className="text-sm">
                        {timesheet.startTime.substring(11, 16)}
                      </p>
                    </td>
                    <td className="text-left px-2 py-3">
                      {timesheet.endTime ? (
                        <p className="text-sm">
                          {timesheet.endTime.substring(11, 16)}
                        </p>
                      ) : (
                        <button
                          onClick={() =>
                            clockOut({ id: timesheet.id, endTime: new Date() })
                          }
                          className="inline-block capitalize bg-mainColor text-sm text-white px-3 py-1 rounded-md"
                        >
                          clock out
                        </button>
                      )}
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
