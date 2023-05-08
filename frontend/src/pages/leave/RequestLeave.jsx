import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useRequestLeaveMutation } from "../../api/leave/leaveApi";
import useToast from "../../hooks/useToast";

function RequestLeave() {
  const [requestLeave, { error, isLoading, isSuccess, isError }] =
    useRequestLeaveMutation();

  // Notification
  const {} = useToast(
    "request-leaf",
    "Request submitted successfully",
    `${error?.data?.message}`,
    "mutation",
    isLoading,
    isSuccess,
    isError
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    requestLeave(data);
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
          {/* leave title */}
          <div className="mb-3">
            <label
              htmlFor="title"
              className="capitalize font-medium mb-1 block text-sm"
            >
              leave title
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
          {/* leave type */}
          <div className="mb-3">
            <label
              htmlFor="type"
              className="capitalize font-medium mb-1 block text-sm"
            >
              leave type
            </label>
            <select
              {...register("type")}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select type</option>
              <option value="maternity leave">Maternity leave</option>
              <option value="paternity leave">Paternity leave</option>
              <option value="annual leave">Annual leave</option>
              <option value="sick leave">Sick leave</option>
              <option value="educational leave">Educational leave</option>
              <option value="other">Other</option>
            </select>
            {errors.type && (
              <span className="text-red-500">leave type is required</span>
            )}
          </div>
        </article>
        <article className="w-full grid grid-cols-2 gap-x-3">
          {/* start date */}
          <div className="mb-3">
            <label
              htmlFor="startDate"
              className="capitalize font-medium mb-1 block text-sm"
            >
              start date
            </label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.startDate && (
              <span className="text-red-500 ">start date is required</span>
            )}
          </div>
          {/* end date */}
          <div className="mb-3">
            <label
              htmlFor="endDate"
              className="capitalize font-medium mb-1 block text-sm"
            >
              end date
            </label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.endDate && (
              <span className="text-red-500 ">end date is required</span>
            )}
          </div>
        </article>

        {/* reason */}
        <div className="mb-3">
          <label
            htmlFor="reason"
            className="capitalize font-medium mb-1 block text-sm"
          >
            reason
          </label>
          <textarea
            type="text"
            {...register("reason", { required: true })}
            rows="7"
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.reason && (
            <span className="text-red-500">leave reason is required</span>
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

export default RequestLeave;
