import React from "react";
import { useGetAllShiftQuery } from "../../api/shift/shiftApi";
import { Link, useParams } from "react-router-dom";
import { setDay, formatDate } from "../../lib/setDay";

import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import useToast from "../../hooks/useToast";

function ShiftList() {
  const { id } = useParams();
  const { currentData, isError, isFetching, error, isSuccess } =
    useGetAllShiftQuery();
  const {} = useToast(
    "get-all-leave application",
    "Successfully loaded",
    `${error?.data?.message}`,
    "query",
    isFetching,
    isSuccess,
    isError
  );
  return (
    <article className="">
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      s/n
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Venue
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Week day
                    </th>
                    <th scope="col" className="px-6 py-4">
                      {" "}
                      Shift category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.length > 0 ? (
                    currentData?.map((shift, i) => {
                      const day = setDay(shift.dayOfTheWeek);
                      return (
                        <tr
                          key={shift.id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                            <Link
                              to={`${shift.id}`}
                              className="first-letter:uppercase"
                            >
                              {shift.title}
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                            {shift.venue}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {day}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                            {shift.studentCategory}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 ">
                            {shift.duration}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 flex items-center gap-x-2">
                            <Link
                              to={`${shift.id}`}
                              className="inline-block rounded bg-mainColor px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
                            >
                              view
                            </Link>
                            <Link
                              to={`${shift.id}/edit`}
                              className="inline-block rounded bg-warning px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
                            >
                              edit
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="p-5 w-full">
                      <td colSpan={7} className="text-center text-xl py-6 ">
                        No shift yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ShiftList;
