import React, { useEffect } from "react";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../api/task/taskApi";
import { useGetStaffQuery } from "../../api/staff/staffApi";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Modal from "../../components/Modal";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { FaTrashAlt, FaRegEye } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import useToast from "../../hooks/useToast";

dayjs.extend(localizedFormat);
function AllUserTasks() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData: userDetails } = useGetStaffQuery(id);
  const [
    updateTask,
    {
      isError: updatingError,
      isLoading: updating,
      error: updateError,
      isSuccess: updated,
    },
  ] = useUpdateTaskMutation();
  const [
    deleteTask,
    {
      isError: deletingError,
      isLoading: deleting,
      error: deleteError,
      isSuccess: deleted,
    },
  ] = useDeleteTaskMutation();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const updateTaskStatus = () => {
    if (!getValues("status")) {
      setError("status", { type: "required" });
      return;
    }
    updateTask({ status: getValues("status"), id: getValues("id") });
  };
  // delete user notification
  const {} = useToast(
    "delete-task",
    "Task deleted successfully",
    `${deleteError?.data?.message}`,
    "mutation",
    deleting,
    deleted,
    deletingError
  );

  // Update shift notification
  const {} = useToast(
    "update-task-1-request",
    "Task updated successfully",
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    updatingError
  );

  return (
    <article className="w-full p-5 md:p-10">
      <article className="w-full p-5 md:p-10">
        <article className="w-full bg-white  rounded-md shadow-">
          <div class="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4 uppercase">
                          {" "}
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
                          className="px-6 py-4 first-letter:uppercase whitespace-nowrap"
                        >
                          start date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 first-letter:uppercase whitespace-nowrap"
                        >
                          due date
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
                      {userDetails?.tasks?.map((task, i) => (
                        <tr
                          key={task.id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td
                            className="whitespace-nowrap px-6 py-4 cursor-pointer"
                            onClick={() => navigate(`${task.id}`)}
                          >
                            {task.title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {dayjs(task.startDate).format("MMM D, YYYY")}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {dayjs(task.dueDate).format("MMM D, YYYY")}

                            {/* <p className="text-xs">
                              {" "}
                              &#40;
                              {dayjs(task.dueDate).diff(
                                task.startDate,
                                "d"
                              )}{" "}
                              days &#41;
                            </p> */}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                            {task.status}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="flex gap-x-2 items-center">
                              <button
                                onClick={() => navigate(`${task.id}`)}
                                className="bg-mainColor text-white font-medium border-none text-xs px-2 py-1 inline-block rounded-sm shadow-mainColor duration-200 transition-all hover:bg-altColor hover:shadow-altColor"
                              >
                                <FaRegEye />
                              </button>
                              <Modal
                                style="bg-orange-500 px-2 py-1 text-xs font-medium uppercase leading-normal text-white shadow-orange-500 transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
                                btnText={<HiOutlineStatusOnline />}
                                targetId="changeStatus"
                                modalTitle={`update status`}
                                confirmText="update"
                                action={updateTaskStatus}
                                // size="small"
                              >
                                <div className="w-full">
                                  <input
                                    type="text"
                                    {...register("id", {
                                      required: true,
                                      value: task.id,
                                    })}
                                    hidden
                                  />
                                  <select
                                    data-te-select-init
                                    {...register("status", { required: true })}
                                    className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
                                  >
                                    <option value="">Update status</option>
                                    <option value="pending">Pending</option>
                                    <option value="ongoing">On-going</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </div>
                              </Modal>
                              {id === task?.userId && (
                                <>
                                  <button
                                    onClick={() => navigate(`${task.id}/edit`)}
                                    className="bg-warning text-white font-medium border-none text-xs px-2 py-1 inline-block rounded-sm shadow-warning duration-200 transition-all hover:bg-altColor hover:shadow-altColor"
                                  >
                                    <BiEditAlt />
                                  </button>

                                  <Modal
                                    style="bg-danger px-2 py-1 text-xs font-medium uppercase rounded-sm text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
                                    btnText={<FaTrashAlt />}
                                    targetId="deleteTask"
                                    modalTitle={`delete task`}
                                    confirmText="delete"
                                    action={() => deleteTask(task.id)}
                                    // size="small"
                                  >
                                    <p>
                                      {task.title} will be deleted permanently
                                    </p>
                                  </Modal>
                                </>
                              )}
                            </span>
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
    </article>
  );
}

export default AllUserTasks;
