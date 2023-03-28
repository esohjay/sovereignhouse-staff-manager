import React from "react";

import {
  useGetShiftQuery,
  useAssignTeacherMutation,
  useDeleteShiftMutation,
} from "../../api/shift/shiftApi";
import { useGetAllStaffQuery } from "../../api/staff/staffApi";
import { useParams, useNavigate } from "react-router-dom";
import { setDay } from "../../lib/setDay";

import Modal from "../../components/Modal";

import { useForm } from "react-hook-form";
import { MdOutlinePersonAddAlt } from "react-icons/md";

function ShiftDetails() {
  const { shiftId } = useParams();
  const navigate = useNavigate();
  const { currentData } = useGetShiftQuery(shiftId);
  const [assignTeacher, result] = useAssignTeacherMutation();
  const [deleteShift, { data, error, status }] = useDeleteShiftMutation();
  const { data: teachers } = useGetAllStaffQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    assignTeacher({ ...data, shift: shiftId });
    reset();
  };
  console.log(result);
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
            <p className="capitalize font-medium">student category:</p>
            <p className="first-letter:uppercase">
              {currentData?.studentCategory}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">venue:</p>
            <p className="first-letter:uppercase">{currentData?.venue}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex justify-evenly items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">day of the week:</p>
            <p className="first-letter:uppercase">
              {setDay(currentData?.dayOfTheWeek)}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">duration:</p>
            <p className="first-letter:uppercase">{currentData?.duration}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex justify-evenly items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">start time:</p>
            <p className="first-letter:uppercase">{currentData?.startTime}</p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">end time:</p>
            <p className="first-letter:uppercase">{currentData?.endTime}</p>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full border-l h-full border-l-mainColor p-3 flex flex-col justify-center cursor-pointer"
          >
            <label
              htmlFor="teacher"
              className="capitalize font-medium mb-1 block text-xs"
            >
              assign teacher
            </label>
            <div className="flex w-full gap-x-1 px-3 border border-mainColor rounded-full ">
              <select
                {...register("user", { required: true })}
                className="w-full  rounded-full focus:outline-none"
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
            </div>
          </form>
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
      <article className="items-center lg:flex-row flex-col gap-3 p-5 flex">
        <div className="h-full flex gap-2 items-center justify-items-center">
          <button
            type="button"
            onClick={() => navigate("edit")}
            className="inline-block rounded bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
          >
            Edit details
          </button>

          <Modal
            style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
            btnText={`Delete shift`}
            targetId="deleteShift"
            modalTitle="Do you want to delete?"
            confirmText="delete"
            action={() => deleteShift(currentData?.id)}
            // size="small"
          >
            <p>This Shift will be deleted permanently</p>
          </Modal>
        </div>
      </article>
    </article>
  );
}

export default ShiftDetails;