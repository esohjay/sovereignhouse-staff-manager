import React from "react";

import {
  useGetLeaveQuery,
  useUpdateLeaveMutation,
} from "../../api/leave/leaveApi";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useToast from "../../hooks/useToast";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

import Btn from "../../components/Btn";

function EditLeave() {
  const navigate = useNavigate();
  const { id, leaveId } = useParams();
  const reqParam = leaveId ? leaveId : id;
  const { currentData } = useGetLeaveQuery(reqParam);
  const [
    updateLeave,
    {
      isError: updatingError,
      isLoading: updating,
      error: updateError,
      isSuccess: updated,
    },
  ] = useUpdateLeaveMutation();

  // Update leave notification
  const {} = useToast(
    "update-leave-1-request",
    "Leave request updated successfully",
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    updatingError
  );
  console.log(dayjs(currentData?.startDate).format("DD/MM/YYYY"));
  // const validationSchema = Yup.object().shape({
  //     title: Yup.string().required("First name is required"),
  //     statusMessage: Yup.string().required("last name is required"),
  //     reason: Yup.string().required("marital status is required"),
  //     type: Yup.string().required("gender is required"),
  //     status: Yup.string().required("status is required"),
  //     startDate: Yup.date().required("start date is required"),
  //     endDate: Yup.date().required("end date is required"),
  //   });
  //   const formOptions = {
  //     resolver: yupResolver(validationSchema),
  //     // defaultValues: validationSchema.cast(),
  //   };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    updateLeave({ ...data, id: currentData?.id, userId: currentData?.userId });
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
              {/* leave type */}
              <div className="mb-3">
                <label
                  htmlFor="type"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  leave type
                </label>
                <select
                  {...register("type", {
                    required: true,
                    value: `${currentData?.type}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value="">Select type</option>
                  <option value="maternity leave">maternity leave</option>
                  <option value="paternity leave">paternity leave</option>
                  <option value="annual leave">annual leave</option>
                  <option value="sick leave">sick leave</option>
                  <option value="educational leave">educational leave</option>
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
                  {...register("startDate", {
                    required: true,
                    value: `${dayjs(currentData?.startDate).format(
                      "DD/MM/YYYY"
                    )}`,
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
                  end date
                </label>
                <input
                  type="date"
                  {...register("endDate", {
                    required: true,
                    value: `${currentData?.endDate}`,
                  })}
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
                {...register("reason", {
                  required: true,
                  value: `${currentData?.reason}`,
                })}
                rows="7"
                className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
              />
              {errors.reason && (
                <span className="text-red-500">leave reason is required</span>
              )}
            </div>
            <button
              type="submit"
              // onClick={() => createCampaign({ title: "dev" })}
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

export default EditLeave;
