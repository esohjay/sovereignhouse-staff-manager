import React, { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import {
  useUpdateCampaignMutation,
  useGetCampaignQuery,
} from "../../api/recruitment/campaignApi";

import { useParams, useNavigate } from "react-router-dom";

import Btn from "../../components/Btn";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

import useToast from "../../hooks/useToast";
function EditCampaign() {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const { currentData } = useGetCampaignQuery(campaignId);
  const [
    editCampaign,
    {
      isError: updatingError,
      isLoading: updating,
      error: updateError,
      isSuccess: updated,
    },
  ] = useUpdateCampaignMutation();
  // Update content notification
  const {} = useToast(
    "update-single-campaign-main",
    "Campaign updated successfully",
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    updatingError
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    department: Yup.string().required("department is required"),
    description: Yup.string().required("description is required"),
    position: Yup.string().required("position is required"),
    workplace: Yup.string().required("workplace is required"),
    contractType: Yup.string().required("contractType is required"),
    status: Yup.string().required("status is required"),
    numberOfCandidates: Yup.number().required(" is required"),
    startDate: Yup.date().required("start date is required"),
    endDate: Yup.date().required("end date is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // const password = generateRandomString();
    // dispatch(signUpWithEmailAndPassword({ ...data, password }));

    editCampaign({ ...data, id: currentData?.id });
  };

  return (
    <>
      {currentData && (
        <article className="w-full p-5">
          <Btn text="back" onClick={() => navigate(-1)} />
          <h3 className="text-center p-3 font-semibold text-mainColor mb-5">
            Update {currentData?.title}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <article className="w-full grid md:grid-cols-2 gap-x-3">
              {/* job position */}
              <div className="mb-3">
                <label
                  htmlFor="position"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  job position
                </label>
                <input
                  type="text"
                  {...register("position", {
                    required: true,
                    value: `${currentData?.position}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.position && (
                  <span className="text-red-500">
                    {errors.position?.message}
                  </span>
                )}
              </div>
              <div className="mb-3 w-full">
                <label
                  htmlFor="department"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  department
                </label>
                <select
                  {...register("department", {
                    required: true,
                    value: `${currentData?.department}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.department}`}>
                    {currentData?.department}
                  </option>
                  <option value="">Select type</option>
                  <option value="administrative">Administrative</option>
                  <option value="IT">IT</option>
                  <option value="accounting">Accounting</option>
                  <option value="marketing">Marketing</option>
                  <option value="social media">Social Media</option>
                  <option value="teacher">Teaching</option>
                  <option value="other">Other</option>
                </select>
                {errors.department && (
                  <span className="text-red-500">
                    {errors.department?.message}
                  </span>
                )}
              </div>
            </article>
            <article className="w-full grid md:grid-cols-2 gap-x-3">
              {/* contract type */}
              <div className="mb-3 w-full">
                <label
                  htmlFor="contractType"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  contract type
                </label>
                <select
                  {...register("contractType", {
                    required: true,
                    value: `${currentData?.contractType}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.contractType}`}>
                    {currentData?.contractType}
                  </option>
                  <option value="employee">Employee</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="other">Other</option>
                </select>
                {errors.contractType && (
                  <span className="text-red-500">
                    {errors.contractType?.message}
                  </span>
                )}
              </div>
              {/* candidate number */}
              <div className="mb-3">
                <label
                  htmlFor="numberOfCandidates"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  number of candidates needed
                </label>
                <input
                  type="number"
                  {...register("numberOfCandidates", {
                    required: true,
                    value: `${currentData?.numberOfCandidates}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.numberOfCandidates && (
                  <span className="text-red-500">
                    {errors.numberOfCandidates?.message}
                  </span>
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
            <article className="w-full grid md:grid-cols-2 gap-x-3">
              {/* workplace */}
              <div className="mb-3">
                <label
                  htmlFor="workplace"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  workplace
                </label>
                <input
                  type="text"
                  {...register("workplace", {
                    required: true,
                    value: `${currentData?.workplace}`,
                  })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.workplace && (
                  <span className="text-red-500">
                    {errors.workplace?.message}
                  </span>
                )}
              </div>
              {/* staus */}
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
                  <option value={`${currentData?.title}`}>
                    {currentData?.title}
                  </option>
                  <option value="active">In progress</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="ended">Ended</option>
                </select>
                {errors.status && (
                  <span className="text-red-500">{errors.status?.message}</span>
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
                <span className="text-red-500">
                  {errors.description?.message}
                </span>
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

export default EditCampaign;
