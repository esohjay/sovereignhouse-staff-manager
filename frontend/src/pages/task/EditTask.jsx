import React from "react";

import { useForm } from "react-hook-form";

import { useUpdateTaskMutation, useGetTaskQuery } from "../../api/task/taskApi";
import { useNavigate, useParams } from "react-router-dom";

import Btn from "../../components/Btn";
function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [editTask, { data }] = useUpdateTaskMutation();
  const { currentData } = useGetTaskQuery(taskId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    editTask({ ...data, id: currentData?.id });
  };
  return (
    <>
      {currentData && (
        <article className="w-full p-5">
          <Btn text="back" onClick={() => navigate(-1)} />
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <article className="w-full grid md:grid-cols-3 gap-x-3">
              {/* task title */}
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  task title
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
              {/* priority */}
              <div className="mb-3 w-full">
                <label
                  htmlFor="priority"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  priority
                </label>
                <select
                  {...register("priority", {
                    required: true,
                    value: `${currentData?.priority}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.priority}`}>
                    {currentData?.priority}
                  </option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                  <option value="low">Low</option>
                  <option value="no priority">No priority</option>
                </select>
                {errors.priority && (
                  <span className="text-red-500">priority is required</span>
                )}
              </div>
              {/* status */}
              <div className="mb-3 w-full">
                <label
                  htmlFor="status"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  status
                </label>
                <select
                  {...register("status", {
                    required: true,
                    value: `${currentData?.status}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.status}`}>
                    {currentData?.status}
                  </option>
                  <option value="pending">Pending</option>
                  <option value="ongoing">On-going</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {errors.status && (
                  <span className="text-red-500">status is required</span>
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
                  {...register("startDate", {
                    required: true,
                    value: `${currentData?.startDate}`,
                  })}
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
                  due date
                </label>
                <input
                  type="date"
                  {...register("dueDate", {
                    required: true,
                    value: `${currentData?.dueDate}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.endDate && (
                  <span className="text-red-500 ">end date is required</span>
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

export default EditTask;
