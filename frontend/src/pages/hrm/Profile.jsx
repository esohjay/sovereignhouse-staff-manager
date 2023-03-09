import React from "react";

import { useGetStaffQuery } from "../../api/staff/staffApi";
import { useParams, useNavigate } from "react-router-dom";

import { MdOutlinePersonAddAlt } from "react-icons/md";

import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function Profile() {
  const { id, userId } = useParams();
  const navigate = useNavigate();
  const reqParam = userId ? userId : id;
  const { currentData } = useGetStaffQuery(reqParam);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const password = generateRandomString();
    // dispatch(signUpWithEmailAndPassword({ ...data, password }));
  };

  return (
    <article className="p-5">
      <article className="border rounded-md border-mainColor">
        <div className="p-3 border-b border-b-mainColor">
          <h3 className="text-center font-semibold text-mainColor capitalize p-3">
            {currentData?.fullName}
          </h3>
        </div>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">email:</p>
            <p className="first-letter:uppercase">{currentData?.email}</p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">phone:</p>
            <p className="first-letter:uppercase">{currentData?.phone}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">gender </p>
            <p className="first-letter:uppercase">{currentData?.gender}</p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">marital status:</p>
            <p className="first-letter:uppercase">
              {currentData?.maritalStatus}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 lg:border-l border-b border-b-mainColor">
            <p className="capitalize font-medium">religion:</p>
            <p className="first-letter:uppercase">{currentData?.religion}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">place of birth </p>
            <p className="first-letter:uppercase">
              {currentData?.placeOfBirth}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">date Of birth:</p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.dateOfBirth).format("MMM D, YYYY")}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 lg:border-l border-b border-b-mainColor">
            <p className="capitalize font-medium">nationality:</p>
            <p className="first-letter:uppercase">{currentData?.nationality}</p>
          </div>
        </article>

        {/* Single row */}
        <article className="flex flex-col lg:flex-row gap-x-2.5">
          <p className="md:text-center lg:border-r lg:border-r-mainColor capitalize md:w-1/4 p-3 font-medium">
            address
          </p>
          <p className="first-letter:uppercase w-9/12 p-3">
            {currentData?.address}
          </p>
        </article>
        {/* Single row */}
        <article className="flex justify-evenly flex-col lg:flex-row border-t items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor border-b lg:border-b-0 border-b-mainColor ">
            <p className="capitalize font-medium">status: </p>
            <p className="first-letter:uppercase">{currentData?.status}</p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b lg:border-b-0 border-b-mainColor">
            <p className="capitalize font-medium">job description:</p>
            <p className="first-letter:uppercase">{currentData?.jobPosition}</p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 lg:border-l border-l-mainColor ">
            <p className="capitalize font-medium">contract type:</p>
            <p className="first-letter:uppercase">
              {currentData?.contractType}
            </p>
          </div>
        </article>
      </article>
      <article className="items-center lg:flex-row flex-col gap-3 flex">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full p-3 flex flex-col justify-center cursor-pointer"
        >
          <div className="flex w-full gap-x-1 px-3 border border-mainColor rounded-full ">
            <select
              {...register("status", {
                required: true,
                value: currentData?.status,
              })}
              className="w-full  rounded-full focus:outline-none"
            >
              <option value="">Change status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="block p-3  text-mainColor text-lg">
              <MdOutlinePersonAddAlt />
            </button>
          </div>
        </form>
        <div className="h-full flex gap-2 items-center justify-items-center">
          <button
            type="button"
            onClick={() =>
              navigate(`/vms/${id}/admin/staff/${currentData.id}/edit`)
            }
            className="inline-block rounded bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
          >
            Edit details
          </button>

          <Modal
            style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
            btnText={`Remove ${currentData?.firstName}`}
            targetId="deleteUser"
            modalTitle="Do you want to delete?"
            confirmText="delete"
            // size="small"
          >
            <p>{currentData?.firstName} will be deleted permanently</p>
          </Modal>
        </div>
      </article>
    </article>
  );
}

export default Profile;
