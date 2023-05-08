import React, { useEffect } from "react";

import {
  useGetTaskQuery,
  useAssignStaffMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../api/task/taskApi";
import { useGetAllStaffQuery } from "../../api/staff/staffApi";
import { useParams, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

import Modal from "../../components/Modal";

import { useForm } from "react-hook-form";
import { MdOutlinePersonAddAlt } from "react-icons/md";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { currentData } = useGetTaskQuery(taskId);
  const [
    assignStaff,
    {
      isError: assigningError,
      isLoading: assigning,
      error: assignError,
      isSuccess: assigned,
    },
  ] = useAssignStaffMutation();
  const { data: teachers } = useGetAllStaffQuery();
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
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const handleAssignStaff = () => {
    if (!getValues("asignees")) {
      setError("asignees", { type: "required" });
      return;
    }
    assignStaff({ task: taskId, asignees: getValues("asignees") });
  };

  const updateTaskStatus = () => {
    if (!getValues("status")) {
      setError("status", { type: "required" });
      return;
    }
    updateTask({ status: getValues("status"), id: taskId });
  }; // Update shift notification
  const {} = useToast(
    "update-task-13-request",
    "Task updated successfully",
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    updatingError
  );
  // assign task notification
  const {} = useToast(
    "assign-task",
    "Task assigned successfully",
    `${assignError?.data?.message}`,
    "mutation",
    assigning,
    assigned,
    assigningError
  );

  // delete user notification
  const {} = useToast(
    "delete1-task",
    "Task deleted successfully",
    `${deleteError?.data?.message}`,
    "mutation",
    deleting,
    deleted,
    deletingError
  );
  useEffect(() => {
    if (deleted) {
      navigate(-1);
    }
  }, [deleted]);
  return (
    <article className="p-5">
      <article className="border rounded-md border-mainColor">
        <div className="p-3 border-b border-b-mainColor">
          <h3 className="text-center font-semibold text-mainColor capitalize p-3">
            {currentData?.title}
          </h3>
        </div>
        {/* Single row */}
        <article className="flex justify-evenly items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">created by:</p>
            <p className="first-letter:uppercase">
              {currentData?.user?.fullName}
            </p>
          </div>
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">status:</p>
            <p className="first-letter:uppercase">{currentData?.status}</p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">priority:</p>
            <p className="first-letter:uppercase">{currentData?.priority}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex justify-evenly items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">start date:</p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.startDate).format("dddd, MMM D, YYYY")}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">end date:</p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.dueDate).format("dddd, MMM D, YYYY")}
            </p>
          </div>
        </article>
        {/* Single row */}
        <article className="grid grid-cols-3 gap-x-2.5 border-b place-items-center ">
          <div className="flex flex-col justify-center  h-full w-full">
            <p className="text-center  capitalize  p-3 font-medium">
              assigned staff
            </p>
          </div>
          <ul className="first-letter:uppercase w-full border-r border-l border-mainColor">
            {currentData?.asignees?.length > 0 ? (
              currentData?.asignees?.map((teacher, i) => (
                <li
                  key={teacher.id}
                  className={`capitalize px-3 pt-3 pb-1 w-full  ${
                    i + 1 < currentData?.asignees?.length &&
                    "border-b border-b-mainColor"
                  }`}
                >
                  {teacher.fullName}
                </li>
              ))
            ) : (
              <p className="text-slate-500 p-3">No assigned teacher</p>
            )}
          </ul>

          <Modal
            style="bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase rounded-sm text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
            btnText="assign staff"
            targetId="assignTask"
            modalTitle={`Select staff`}
            confirmText="assign"
            action={handleAssignStaff}
            // size="small"
          >
            {teachers?.map((teacher) => (
              <span key={teacher.id} className="flex gap-x-2">
                <input
                  type="checkbox"
                  className="accent-mainColor"
                  id={teacher.id}
                  value={teacher.id}
                  {...register("asignees")}
                />
                <label htmlFor={teacher.id}>{teacher.fullName}</label>
              </span>
            ))}
          </Modal>
        </article>
        {/* Single row */}
        <article className="flex gap-x-2.5">
          <p className="text-center border-r border-r-mainColor capitalize w-1/4 p-3 font-medium">
            note
          </p>
          <p className="first-letter:uppercase w-9/12 p-3">
            {currentData?.description}
          </p>
        </article>
      </article>
      <article className="p-5 flex gap-x-3">
        <Modal
          style="bg-orange-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-orange-500 transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
          btnText="Update status"
          targetId="changeStatus"
          modalTitle={`update status`}
          confirmText="update"
          action={updateTaskStatus}
          // size="small"
        >
          <div className="w-full">
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
        <button
          type="button"
          onClick={() => navigate("edit")}
          className="inline-block rounded bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
        >
          Edit details
        </button>
        <Modal
          style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase rounded-sm text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-red-400 hover:shadow-red-400,0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
          btnText="delete"
          targetId="deleteTask"
          modalTitle={`delete task`}
          confirmText="delete"
          action={() => deleteTask(currentData?.id)}
          // size="small"
        >
          <p>{currentData?.title} will be deleted permanently</p>
        </Modal>
      </article>
    </article>
  );
}

export default TaskDetails;
