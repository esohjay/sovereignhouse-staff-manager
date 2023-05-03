import React from "react";

import Btn from "../../components/Btn";
import Modal from "../../components/Modal";

import { useNavigate, useParams } from "react-router-dom";

import {
  useGetApplicationQuery,
  useUpdateApplicationMutation,
  useDeleteApplicantMutation,
} from "../../api/recruitment/campaignApi";
import { useCreateStaffMutation } from "../../api/staff/staffApi";
import generateRandomString from "../../lib/generatePassword";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { useForm } from "react-hook-form";

function ApplicantDetails() {
  const navigate = useNavigate();
  const { applicantId } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetApplicationQuery(applicantId);
  const [deleteApplicant, { status }] = useDeleteApplicantMutation();
  const [updateApplication, { status: applicationStatus }] =
    useUpdateApplicationMutation();
  const [registerStaff, { status: registerStatus }] = useCreateStaffMutation();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const updateApplicationStage = () => {
    if (!getValues("status")) {
      setError("status", { type: "required" });
      return;
    }
    if (
      getValues("status") === "accepted" &&
      currentData?.status !== "accepted"
    ) {
      const password = generateRandomString();
      registerStaff({
        password,
        firstName: currentData?.firstName,
        lastName: currentData?.lastName,
        gender: currentData?.gender,
        phone: currentData?.phone,
        email: currentData?.email,
        address: currentData?.address,
        jobPosition: currentData?.Campaign?.position,
        contractType: currentData?.Campaign?.contractType,
      });
    }
    updateApplication({
      id: currentData?.id,
      status: getValues("status"),
    });
  };
  const scheduleInterview = () => {
    if (!getValues("message")) {
      setError("message", { type: "required" });
      return;
    }
    if (!getValues("link")) {
      setError("link", { type: "required" });
      return;
    }
    updateApplication({
      id: currentData?.id,
      link: getValues("link"),
      message: getValues("message"),
      email: currentData?.email,
      status: getValues("status"),
    });
  };
  return (
    <article className="p-2 lg:px-5 lg:py-10 space-y-3">
      <Btn text={"back"} onClick={() => navigate(-1)} />
      <article className="border rounded-md border-mainColor mb-5">
        <div className="p-3 border-b border-b-mainColor">
          <h3 className="text-center font-semibold text-mainColor capitalize p-3">
            {currentData?.Campaign?.position}
          </h3>
        </div>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center border-b border-b-mainColor">
          <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              fullname
            </p>
            <p className="first-letter:uppercase">{currentData?.fullName}</p>
          </div>
          <div className="flex gap-x-2 flex-col w-full  lg:justify-center p-3 border-r border-r-mainColor">
            <p className="capitalize font-xs md:text-sm font-semibold">
              gender
            </p>
            <p className="first-letter:uppercase">{currentData?.gender}</p>
          </div>
          <div className="flex gap-x-2 w-full flex-col lg:justify-center p-3 ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              application stage
            </p>
            <p className="first-letter:uppercase">{currentData?.status}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center border-b border-b-mainColor">
          <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              email address
            </p>
            <a className="" href={`mailto:${currentData?.email}`}>
              {currentData?.email}
            </a>
          </div>
          <div className="flex gap-x-2 flex-col w-full  lg:justify-center p-3  ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              phone no
            </p>
            <p className="first-letter:uppercase">{currentData?.phone}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center  ">
          <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              submitted on
            </p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.createdAt).format("ddd, MMM D, YYYY")}
            </p>
          </div>
          <div className="flex gap-x-2 flex-col w-full  lg:justify-center p-3  ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              address
            </p>
            <p className="first-letter:uppercase">{currentData?.address}</p>
          </div>
        </article>
      </article>
      <article className="items-center lg:flex-row flex-col gap-3 flex">
        <div className="h-full flex gap-2 items-center justify-items-center">
          <a
            type="button"
            download
            href={`${import.meta.env.VITE_BACKEND_LINK}/uploads/resumes/${
              currentData?.fileSrc
            }`}
            target="_blank"
            className="inline-block rounded bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
          >
            Download resume
          </a>

          <Modal
            style="bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-warning transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
            btnText={"update application stage"}
            targetId="changeStatus"
            modalTitle={`Update application stage`}
            confirmText="update"
            action={updateApplicationStage}
            // size="small"
          >
            <div className="w-full">
              <select
                data-te-select-init
                {...register("status", { required: true })}
                className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
              >
                <option value="">Update stage</option>
                <option value="pending">Pending</option>
                <option value="interviewing">Interviewing</option>
                <option value="documentation">Documentation</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </Modal>
          <Modal
            style="bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-warning transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
            btnText={"schedule an interview"}
            targetId="interview"
            modalTitle={`Send invterview message`}
            confirmText="send"
            action={scheduleInterview}
            // size="small"
          >
            <div className="mb-2">
              <label
                htmlFor="message"
                className="capitalize font-medium mb-1 block text-sm"
              >
                message
              </label>
              <textarea
                {...register("message", {
                  required: true,
                })}
                rows="5"
                className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="meeting link"
                className="capitalize font-medium mb-1 block text-sm"
              >
                meeting link
              </label>
              <input
                {...register("link", {
                  required: true,
                })}
                className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
              ></input>
            </div>
          </Modal>

          <Modal
            style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
            btnText={`Delete application`}
            targetId="deleteApplicant"
            modalTitle="Do you want to delete?"
            confirmText="delete"
            action={() => deleteApplicant(currentData?.id)}
            // size="small"
          >
            <p>This will be deleted permanently</p>
          </Modal>
        </div>
      </article>
    </article>
  );
}

export default ApplicantDetails;