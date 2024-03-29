import React, { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import useToast from "../../hooks/useToast";

import { useCreateShiftMutation } from "../../api/shift/shiftApi";

function AddShift() {
  const [createShift, { error, isLoading, isSuccess, isError }] =
    useCreateShiftMutation();

  const {} = useToast(
    "add-shift",
    "Shift added successfully",
    `${error?.data?.message}`,
    "mutation",
    isLoading,
    isSuccess,
    isError
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createShift({ ...data, dayOfTheWeek: parseInt(data.dayOfTheWeek) });
  };
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);
  return (
    <article className="w-full p-5">
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
              {...register("title", { required: true })}
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
              {...register("venue", { required: true })}
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
              shift category
            </label>
            <select
              {...register("studentCategory", { required: true })}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select category</option>
              <option value="basic">Basic Class</option>
              <option value="intermediate">Intermediate Class</option>
              <option value="advanced">Advanced Class</option>
              <option value="non-teaching">Non teaching</option>
            </select>
            {errors.studentCategory && (
              <span className="text-red-500">shift category is required</span>
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
              {...register("dayOfTheWeek", { required: true })}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select day</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="7">Daily</option>
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
              {...register("startTime", { required: true })}
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
              {...register("endTime", { required: true })}
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
              {...register("duration", { required: true })}
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
            {...register("description", { required: true })}
            rows="7"
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.description && (
            <span className="text-red-500">description is required</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6"
        >
          submit
        </button>
      </form>
    </article>
  );
}

export default AddShift;
