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
            <article className="w-full grid md:grid-cols-3 gap-x-3">
              {/* article name */}
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  article name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                    value: `${currentData?.name}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.name && (
                  <span className="text-red-500 ">name is required</span>
                )}
              </div>
              {/* priority */}
              <div className="mb-3 w-full">
                <label
                  htmlFor="group"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  group
                </label>
                <select
                  {...register("group", {
                    required: true,
                    value: `${currentData?.group}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.group}`}>
                    {currentData?.group}
                  </option>
                  <option value="employee">Employee</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="other">Other</option>
                </select>
                {errors.group && (
                  <span className="text-red-500">group is required</span>
                )}
              </div>
            </article>

            {/* link */}
            <div className="mb-3">
              <label
                htmlFor="link"
                className="capitalize font-medium mb-1 block text-sm"
              >
                link
              </label>
              <textarea
                type="text"
                {...register("link", {
                  required: true,
                  value: `${currentData?.title}`,
                })}
                rows="7"
                className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
              />
              {errors.link && (
                <span className="text-red-500">link is required</span>
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
