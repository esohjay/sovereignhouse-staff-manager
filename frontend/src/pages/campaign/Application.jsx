import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import logo from "../../assets/logo.png";
import Btn from "../../components/Btn";

import {
  useNewApplicationMutation,
  useGetCampaignQuery,
} from "../../api/recruitment/campaignApi";
import { useUploadMutation } from "../../api/app";
function Application() {
  const { campaign } = useParams();
  const [
    submitApplication,
    { status: submissionStatus, isError, error, isLoading },
  ] = useNewApplicationMutation();
  const [uploadResume, { data: cv, status }] = useUploadMutation();
  const { currentData } = useGetCampaignQuery(campaign);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string().email().required("email is required"),
    address: Yup.string().required("address is required"),
    gender: Yup.string().required("gender is required"),
    phone: Yup.string().required("phone is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    if (!cv) {
      setError("file", { type: "required" });
      return;
    }

    submitApplication({ ...data, ...cv, CampaignId: campaign });
  };
  console.log(submissionStatus);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 5) {
      alert("File size too large");
      return;
    }
    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/pdf" ||
      file.type === "application/msword"
    ) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      uploadResume(bodyFormData);
    } else {
      alert("File format not allowed");
      return;
    }
  };
  const goBack = () => {
    reset();
    window.history.back();
  };
  return (
    <section className="bg-mainColor grid place-items-center gap-y-5 py-24 min-h-screen p-3">
      <figure>
        <img src={logo} alt="logo" />
      </figure>
      <article className="w-full bg-gray rounded-lg shadow-md max-w-md lg:max-w-lg p-5">
        <h3 className="uppercase text-center font-medium mb-5">
          {currentData?.position} role
        </h3>
        {submissionStatus !== "fulfilled" ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className="grid md:grid-cols-2 gap-x-3">
              <div className="mb-3">
                <label
                  htmlFor="firstName"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  first name
                </label>
                <input
                  type="text"
                  {...register("firstName", { required: true })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.firstName && (
                  <span className="text-red-500 ">
                    {errors.firstName?.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="lastName"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  last name
                </label>
                <input
                  type="text"
                  {...register("lastName", { required: true })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.lastName && (
                  <span className="text-red-500">
                    {errors.lastName?.message}
                  </span>
                )}
              </div>
            </article>
            <article className="grid md:grid-cols-2 gap-x-3">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  email
                </label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email?.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  phone
                </label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone?.message}</span>
                )}
              </div>
            </article>
            <article className="grid md:grid-cols-2 gap-x-3">
              <div className="mb-3 w-full">
                <label
                  htmlFor="gender"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  gender
                </label>
                <select
                  {...register("gender")}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500">{errors.gender?.message}</span>
                )}
              </div>
              <div className="mb-5">
                <label>
                  <label
                    htmlFor="cv"
                    className="block mb-2 font-semibold text-sm"
                  >
                    Upload CV
                  </label>
                  <input
                    type="file"
                    id="cv"
                    disabled={status === "pending"}
                    onChange={handleFileUpload}
                    className="text-sm text-grey-500 file:border-2 file:border-transparent file:mr-3 file:py-1 file:px-3 file:text-sm 
                file:rounded-md file:transition-all file:duration-500 file:font-medium file:bg-mainColor file:text-white
                hover:file:cursor-pointer hover:file:bg-white  hover:file:text-mainColor hover:file:border-mainColor 
          "
                  />
                </label>
                {status === "fulfilled" && (
                  <span className="text-green-500 ">Resume uploaded</span>
                )}
                {errors.file && (
                  <span className="text-red-500 ">Upload your resume</span>
                )}
              </div>
            </article>
            <div className="mb-3">
              <label
                htmlFor="address"
                className="capitalize font-medium mb-1 block text-sm"
              >
                address
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
              />
              {errors.address && (
                <span className="text-red-500 ">{errors.address?.message}</span>
              )}
            </div>
            <button
              disabled={isLoading}
              className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6"
            >
              submit
            </button>
            {isError && (
              <span className="text-red-500 ">{error?.data?.message}</span>
            )}
          </form>
        ) : (
          <div className="grid place-items-center">
            <p className="text-mainColor">Application submitted successfully</p>
            <p className="mb-3 text-mainColor">You will hear from us shortly</p>
            <Btn text={"go back"} onClick={goBack} />
          </div>
        )}
      </article>
    </section>
  );
}

export default Application;
// copy link to application
// application page
