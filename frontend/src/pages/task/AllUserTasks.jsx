import React, { useEffect } from "react";
import {
  useGetUserTasksQuery,
  useUpdateTaskMutation,
} from "../../api/task/taskApi";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

dayjs.extend(localizedFormat);
function AllUserTasks() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetUserTasksQuery(id);
  const [updateTaskStatus, result] = useUpdateTaskMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    updateTaskStatus(data);
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
                title
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold ">
                start date
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                due date
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
            {currentData?.map((task, i) => (
              <tr
                key={task.id}
                className="hover:bg-lightGreen p-3 cursor-pointer group"
              >
                <td className="w-ful text-left p-4 w-14">{i + 1}</td>
                <td className="w-ful text-left px-2 py-3 ">{task.title}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  {dayjs(task.startDate).format("MMM D, YYYY")}
                </td>
                <td className="w-ful text-left px-2 py-3 ">
                  {dayjs(task.dueDate).format("MMM D, YYYY")}
                </td>
                <td className="w-ful text-left px-2 py-3 ">{task.status}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  <div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex gap-x-2"
                    >
                      <input
                        type="text"
                        {...register("id", { required: true, value: task.id })}
                        hidden
                      />
                      <select {...register("status", { required: true })}>
                        <option value="">Update status</option>
                        <option value="pending">Pending</option>
                        <option value="ongoing">On-going</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
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

export default AllUserTasks;
