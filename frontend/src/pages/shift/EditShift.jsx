import React from "react";
import Btn from "../../components/Btn";

import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setDay } from "../../lib/setDay";

import useToast from "../../hooks/useToast";

import {
  useGetShiftQuery,
  useUpdateShiftMutation,
} from "../../api/shift/shiftApi";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

function EditShift() {
  const navigate = useNavigate();
  const { shiftId } = useParams();
  const { currentData } = useGetShiftQuery(shiftId);

  const [
    updateShift,
    {
      isError: updatingError,
      isLoading: updating,
      error: updateError,
      isSuccess: updated,
    },
  ] = useUpdateShiftMutation();
  // Update shift notification
  const {} = useToast(
    "update-shfft-1-request",
    "Shift updated successfully",
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    updatingError
  );

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    updateShift({
      ...data,
      id: currentData?.id,
      dayOfTheWeek: parseInt(data.dayOfTheWeek),
    });
  };
  return (
    <>
      {currentData && (
        <article className="w-full p-5">
          <Btn text="back" onClick={() => navigate(-1)} />
          <h3 className="text-center font-semibold text-mainColor mb-5">
            Update {currentData?.title}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className="w-full grid md:grid-cols-2 gap-x-3">
              {/* shift title */}
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  shift title
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: true,
                    value: `${currentData?.title}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.title && (
                  <span className="text-red-500 ">title is required</span>
                )}
              </div>
              {/* venue */}
              <div className="mb-3">
                <label
                  htmlFor="venue"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  venue
                </label>
                <input
                  type="text"
                  {...register("venue", {
                    required: true,
                    value: `${currentData?.venue}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.venue && (
                  <span className="text-red-500">venue is required</span>
                )}
              </div>
            </article>
            <article className="w-full grid md:grid-cols-2 gap-x-3">
              {/* student category */}
              <div className="mb-3 w-full">
                <label
                  htmlFor="studentCategory"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  student category
                </label>
                <select
                  {...register("studentCategory", {
                    required: true,
                    value: `${currentData?.studentCategory}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.studentCategory}`}>
                    {currentData?.studentCategory}
                  </option>
                  <option value="">Select category</option>
                  <option value="basic">Basic Class</option>
                  <option value="intermediate">Intermediate Class</option>
                  <option value="advanced">Advanced Class</option>
                  <option value="non-teaching">Non teaching</option>
                </select>
                {errors.studentCategory && (
                  <span className="text-red-500">
                    student category is required
                  </span>
                )}
              </div>
              {/* week day */}
              <div className="mb-3 w-full">
                <label
                  htmlFor="dayOfTheWeek"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  week day
                </label>
                <select
                  {...register("dayOfTheWeek", {
                    required: true,
                    value: `${currentData?.dayOfTheWeek}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.dayOfTheWeek}`}>
                    {setDay(currentData?.dayOfTheWeek)}
                  </option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                </select>
                {errors.dayOfTheWeek && (
                  <span className="text-red-500">week day is required</span>
                )}
              </div>
            </article>
            <article className="w-full grid md:grid-cols-3 gap-x-3">
              {/* start time */}
              <div className="mb-3">
                <label
                  htmlFor="startTime"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  start time
                </label>
                <input
                  type="time"
                  {...register("startTime", {
                    required: true,
                    value: `${currentData?.startTime}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.startTime && (
                  <span className="text-red-500 ">start time is required</span>
                )}
              </div>
              {/* end time */}
              <div className="mb-3">
                <label
                  htmlFor="endTime"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  end time
                </label>
                <input
                  type="time"
                  {...register("endTime", {
                    required: true,
                    value: `${currentData?.endTime}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.endTime && (
                  <span className="text-red-500">end time is required</span>
                )}
              </div>
              {/* duration */}
              <div className="mb-3">
                <label
                  htmlFor="duration"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  duration &#40;hours&#41;
                </label>
                <input
                  type="number"
                  {...register("duration", {
                    required: true,
                    value: `${currentData?.duration}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.duration && (
                  <span className="text-red-500">duration is required</span>
                )}
              </div>
            </article>
            {/* description */}
            <div className="mb-3">
              <label
                htmlFor="description"
                className="capitalize font-medium mb-1 block text-sm"
              >
                description
              </label>
              <textarea
                type="text"
                {...register("description", {
                  required: true,
                  value: `${currentData?.description}`,
                })}
                rows="7"
                className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
              />
              {errors.description && (
                <span className="text-red-500">description is required</span>
              )}
            </div>
            <button
              type="submit"
              disabled={updating}
              className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6"
            >
              submit
            </button>
          </form>
        </article>
      )}
    </>
  );
}

export default EditShift;
