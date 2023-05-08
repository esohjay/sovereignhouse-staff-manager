import React, { useState, useEffect } from "react";
import { useGetStaffQuery } from "../../api/staff/staffApi";
import useAuth from "../../hooks/useAuth";
import {
  useRecordClockInMutation,
  useGetUserTimesheetQuery,
  useEndShiftMutation,
} from "../../api/shift/shiftApi";
import { useParams, Link, useNavigate } from "react-router-dom";
import { setDay, formatDate } from "../../lib/setDay";
import Btn from "../../components/Btn";
import useToast from "../../hooks/useToast";
import { toast } from "react-toastify";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function Timesheet() {
  const { id, userId } = useParams();
  const {} = useAuth();
  const navigate = useNavigate();
  const reqParam = userId ? userId : id;
  const [
    clockIn,
    {
      isError: clockingInError,
      isLoading: clockingIn,
      error: errorClockingIn,
      isSuccess: clockedIn,
    },
  ] = useRecordClockInMutation();
  const [
    clockOut,
    {
      isError: clockingOutError,
      isLoading: clockingOut,
      error: errorClockingOut,
      isSuccess: clockedOut,
    },
  ] = useEndShiftMutation();
  const [clockInError, setClockInError] = useState("");
  const { currentData } = useGetStaffQuery(reqParam);
  const { currentData: userTimesheet } = useGetUserTimesheetQuery(reqParam);
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
  // assign shift notification
  const {} = useToast(
    "clocking",
    "Clocked in successfully",
    `${errorClockingIn?.data?.message}`,
    "mutation",
    clockingIn,
    clockedIn,
    clockingInError
  );
  // assign shift notification
  const {} = useToast(
    "clock-out",
    "Clocked out successfully",
    `${errorClockingOut?.data?.message}`,
    "mutation",
    clockingOut,
    clockedOut,
    clockingOutError
  );

  const otherAlert = () => {
    toast(clockInError, {
      toastId: "other-alerts",
      type: toast.TYPE.ERROR,
      autoClose: 5000,
    });
  };

  useEffect(() => {
    if (clockInError) {
      otherAlert();
    }
    setClockInError("");
  }, [clockInError]);
  return (
    <article className="p-5 md:p-20">
      <article className="space-y-3">
        <Btn text={"back"} onClick={() => navigate(-1)} />
        <article className="mb-7 bg-white rounded-md shadow-md p-2">
          <div className="p-3 border-b border-b-mainColor">
            <h3 className="text-center font-semibold text-mainColor capitalize p-3">
              {userId
                ? `${currentData?.fullName}'s shifts`
                : "available shifts"}
            </h3>
          </div>
          {/* Shifts */}
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4 hidden md:block">
                          S/N
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-4 hidden md:block">
                          Venue
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData?.shifts?.map((shift, i) => {
                        const day = setDay(shift.dayOfTheWeek);
                        return (
                          <tr
                            key={shift.id}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium hidden md:block">
                              {i + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {" "}
                              <Link
                                to={`/admin/${id}/shift/${shift.id}`}
                                className="mb-1 text-sm font-semibold  capitalize"
                              >
                                {shift.title}
                              </Link>
                              <p className="text-xs">
                                &#40;{shift.startTime.substring(0, 5)} to{" "}
                                {shift.endTime.substring(0, 5)}&#41;
                              </p>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 hidden md:block">
                              {" "}
                              <p className="text-sm first-letter:uppercase">
                                {shift.venue}
                              </p>
                              <p className="text-xs">&#40;{day}&#41;</p>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button
                                type="button"
                                onClick={() =>
                                  handleClockIn(shift.dayOfTheWeek, shift.id)
                                }
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                className="inline-block rounded bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-warning focus:shadow-warning focus:outline-none focus:ring-0 "
                              >
                                Clock in
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* <table className="w-full">
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
          </table> */}
        </article>
        <article className="mb-7 bg-white rounded-md shadow-md p-2">
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
                        className="mb-1 text-xs font-semibold"
                      >
                        {timesheet.shift.title}
                      </Link>
                      <p className="text-xs">
                        {" "}
                        &#40;{dayjs(timesheet.startTime).format("MM/DD/YYYY")}
                        &#41;
                      </p>
                    </td>
                    <td className="text-left px-2 py-3 ">
                      <p className="text-sm">
                        {/* {timesheet.startTime.substring(11, 16)} */}
                        {dayjs(timesheet.startTime).format("hh:mma")}
                      </p>
                    </td>
                    <td className="text-left px-2 py-3">
                      {timesheet.endTime ? (
                        <p className="text-sm">
                          {dayjs(timesheet.endTime).format("hh:mma")}
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
