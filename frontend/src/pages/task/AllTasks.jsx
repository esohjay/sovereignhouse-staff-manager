import React, { useEffect } from "react";
import {
  useGetLeaveRequestsQuery,
  useUpdateLeaveMutation,
} from "../../api/leave/leaveApi";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function AllTasks() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetLeaveRequestsQuery();
  const [updateLeave, result] = useUpdateLeaveMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    updateLeave(data);
  };

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
                leave type
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                duration
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                status
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((leave, i) => (
              <tr
                key={leave.id}
                className="hover:bg-lightGreen p-3 cursor-pointer group"
              >
                <td className="w-ful text-left p-4 w-14">{i + 1}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  {leave.user.fullName}
                </td>
                <td className="w-ful text-left px-2 py-3 ">{leave.type}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  {leave.startDate.substring(0, 10)} -{" "}
                  {leave.endDate.substring(0, 10)}
                </td>
                <td className="w-ful text-left px-2 py-3 ">{leave.status}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  <div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex gap-x-2"
                    >
                      <input
                        type="text"
                        {...register("id", { required: true, value: leave.id })}
                        hidden
                      />
                      <select {...register("status", { required: true })}>
                        <option value="">Update status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="unapproved">Unapproved</option>
                      </select>
                      <button className="inline-block p-1 rounded-md bg-mainColor text-white text-xs">
                        Update
                      </button>
                    </form>
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

export default AllTasks;
