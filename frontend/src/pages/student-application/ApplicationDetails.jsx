import React, { useEffect } from "react";

import Btn from "../../components/Btn";
import Modal from "../../components/Modal";

import { useNavigate, useParams } from "react-router-dom";

import {
  useDeleteApplicationMutation,
  useGetApplicantionQuery,
} from "../../api/student-application";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { useForm } from "react-hook-form";
import useToast from "../../hooks/useToast";

function ApplicantDetails() {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { currentData, isError, isFetching, error, isSuccess } =
    useGetApplicantionQuery(studentId);
  const [
    deleteApplicant,
    {
      isError: deleteError,
      isLoading: deleting,
      isSuccess: deleted,
      error: deleteErrorMessage,
    },
  ] = useDeleteApplicationMutation();

  // Load content notification
  const {} = useToast(
    "get-single-student-applicant",
    "Successfully loaded",
    `${error?.data?.message}`,
    "query",
    isFetching,
    isSuccess,
    isError
  );

  // Delete content notification
  const {} = useToast(
    "delete-single-student-application",
    `${currentData?.firstName}'s application deleted`,
    `${deleteErrorMessage?.data?.message}`,
    "mutation",
    deleting,
    deleted,
    deleteError
  );
  // Update content notification

  useEffect(() => {
    if (deleted) {
      navigate(-1);
    }
  }, [deleted]);
  return (
    <article className="p-2 lg:px-5 lg:py-10 space-y-3">
      <Btn text={"back"} onClick={() => navigate(-1)} />
      <article className="border rounded-md border-mainColor mb-5">
        <div className="p-3 border-b border-b-mainColor">
          <h3 className="text-center font-semibold text-mainColor capitalize p-3">
            {currentData?.full_name}
          </h3>
        </div>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center border-b border-b-mainColor">
          <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              fullname
            </p>
            <p className="first-letter:uppercase">{currentData?.full_name}</p>
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
            <p className="first-letter:uppercase">{currentData?.age_group}</p>
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
    </article>
  );
}

export default ApplicantDetails;
