import React from "react";

import {
  useGetTaskQuery,
  useAssignStaffMutation,
} from "../../api/task/taskApi";
import { useGetAllStaffQuery } from "../../api/staff/staffApi";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { MdOutlinePersonAddAlt } from "react-icons/md";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function TaskDetails() {
  const { taskId } = useParams();
  const { currentData } = useGetTaskQuery(taskId);
  const [assignStaff, result] = useAssignStaffMutation();
  const { data: teachers } = useGetAllStaffQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    // assignTeacher({ ...data, task: taskId });
    if (!data.asignees || !data.asignees.length) {
      setError("asignees", { type: "required" });
      return;
    }
    assignStaff({ ...data, task: taskId });
    // reset();
  };
  //   console.log(result);
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
        <article className="grid grid-cols-3 gap-x-2.5 border-b place-items-center">
          <div className="flex flex-col justify-center border-r border-r-mainColor h-full w-full">
            <p className="text-center  capitalize  p-3 font-medium">
              assigned {currentData?.users?.length > 1 ? "teachers" : "teacher"}
            </p>
          </div>
          <ul className="first-letter:uppercase w-full">
            {currentData?.users?.length > 0 ? (
              currentData?.users?.map((teacher, i) => (
                <li
                  key={teacher.id}
                  className={`capitalize p-3 w-full  ${
                    i + 1 < currentData?.users?.length &&
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

          {/* <div className="flex w-full gap-x-1 px-3 border border-mainColor rounded-full ">
              <select
                {...register("user", { required: true })}
                className="w-full  rounded-full focus:outline-none"
                multiple
              >
                <option value="">Select teacher</option>
                {teachers?.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.fullName}
                  </option>
                ))}
              </select>
              <button className="block p-3  text-mainColor text-lg">
                <MdOutlinePersonAddAlt />
              </button>
            </div> */}

          <button
            type="button"
            className="inline-block rounded bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#334B11] transition duration-150 ease-in-out hover:bg-lightGreen hover:text-mainColor hover:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:bg-altColor focus:text-white focus:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:outline-none focus:ring-0 active:bg-altColor active:text-white active:shadow-[0_8px_9px_-4prgba(51, 75, 17,0.3)x_,0_4px_18px_0_rgba(51, 75, 17,0.2)]"
            data-te-toggle="modal"
            data-te-target="#exampleModal"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Assign staff
          </button>

          <div
            data-te-modal-init
            className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              data-te-modal-dialog-ref
              className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
            >
              <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  <h5
                    className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                    id="exampleModalLabel"
                  >
                    Select staff
                  </h5>
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    data-te-modal-dismiss
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <div
                    className="relative flex-auto p-4"
                    data-te-modal-body-ref
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
                    {errors.asignees && (
                      <span className="text-red-500">
                        select at least one staff
                      </span>
                    )}
                  </div>
                  <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      data-te-modal-dismiss
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
    </article>
  );
}

export default TaskDetails;
