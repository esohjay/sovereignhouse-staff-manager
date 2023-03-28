import React from "react";
import { useGetAllShiftQuery } from "../../api/shift/shiftApi";
import { Link, useParams } from "react-router-dom";
import { setDay, formatDate } from "../../lib/setDay";

import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";

function ShiftList() {
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllShiftQuery();
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
                      Student category
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
                  {currentData?.map((shift, i) => {
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
                        <td className="whitespace-nowrap px-6 py-4 ">{day}</td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          {shift.studentCategory}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          {shift.duration}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex items-center gap-x-2">
                          <Link
                            to={`${shift.id}`}
                            className="text-mainColor text-lg"
                          >
                            <FaRegEye />
                          </Link>
                          <Link
                            to={`${shift.id}/edit`}
                            className="text-warning text-lg"
                          >
                            <FaEdit />
                          </Link>
                          <button className="bg-transparent text-lg text-danger ">
                            <FaTrash />
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
    </article>
  );
}

export default ShiftList;
