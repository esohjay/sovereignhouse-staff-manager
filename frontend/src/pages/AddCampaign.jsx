import React, { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { useCreateCampaignMutation } from "../api/recruitment/campaignApi";

function AddCampaign() {
  const [createCampaign, result] = useCreateCampaignMutation();
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
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
    console.log("submit");
    createCampaign(data);
  };

  return (
    <article className="w-full p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="w-full grid md:grid-cols-2 gap-x-3">
          {/* job title */}
          <div className="mb-3">
            <label
              htmlFor="title"
              className="capitalize font-medium mb-1 block text-sm"
            >
              job title
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
              {...register("position", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.position && (
              <span className="text-red-500">{errors.position?.message}</span>
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
              {...register("contractType")}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select type</option>
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
              {...register("numberOfCandidates", { required: true })}
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
              {...register("workplace", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.workplace && (
              <span className="text-red-500">{errors.workplace?.message}</span>
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
              {...register("status")}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select status</option>
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
            {...register("description", { required: true })}
            rows="7"
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description?.message}</span>
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
  );
}

export default AddCampaign;
