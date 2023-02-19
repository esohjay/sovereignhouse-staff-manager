import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { useCreateShiftMutation } from "../api/shift/shiftApi";

function AddShift() {
  const [createShift, result] = useCreateShiftMutation();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    venue: Yup.string().required("venue is required"),
    dayOfTheWeek: Yup.string().required("this field is required"),
    shiftLength: Yup.string().required("shift length is required"),
    studentCategory: Yup.string().required("student category is required"),
    description: Yup.string().required("description is required"),
    startTime: Yup.date().required("start time is required"),
    endTime: Yup.date().required("end time is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    dispatch(logInWithEmailAndPassword(data));
  };
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
              <span className="text-red-500 ">{errors.title?.message}</span>
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
              <span className="text-red-500">{errors.venue?.message}</span>
            )}
          </div>
        </article>
      </form>
    </article>
  );
}

export default AddShift;
