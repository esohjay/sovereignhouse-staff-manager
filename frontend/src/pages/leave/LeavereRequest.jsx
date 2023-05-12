import React from "react";
import useToast from "../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserLeaveQuery } from "../../api/leave/leaveApi";

function LeaveRequests() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentData, error, isFetching, isSuccess, isError } =
    useGetUserLeaveQuery(id);
  const {} = useToast(
    "get-user-leave-application",
    "Successfully loaded",
    `${error?.data?.message}`,
    "query",
    isFetching,
    isSuccess,
    isError
  );
  return (
    <article className="w-full p-5 md:p-10">
      <article className="w-full bg-white  rounded-md shadow-">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        s/n
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((leave, i) => (
                      <tr
                        key={leave.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {i + 1}
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 cursor-pointer"
                          onClick={() => navigate(`${leave.id}`)}
                        >
                          {leave.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          {leave.status}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase flex gap-x-2 items-center">
                          <button
                            type="button"
                            onClick={() => navigate(`${leave.id}`)}
                            className="inline-block rounded bg-mainColor px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
                          >
                            view
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`${leave.id}/edit`)}
                            className="inline-block rounded bg-warning px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
                          >
                            edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </article>
    </article>
  );
}

export default LeaveRequests;
