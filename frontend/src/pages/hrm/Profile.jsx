import React from "react";

import { useGetStaffQuery } from "../../api/staff/staffApi";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function Profile() {
  const { id, userId } = useParams();
  const reqParam = userId ? userId : id;
  const { currentData } = useGetStaffQuery(reqParam);

  return (
    <article className="p-5">
      <article className="border rounded-md border-mainColor">
        <div className="p-3 border-b border-b-mainColor">
          <h3 className="text-center font-semibold text-mainColor capitalize p-3">
            {currentData?.fullName}
          </h3>
        </div>
        {/* Single row */}
        <article className="flex justify-evenly items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">email:</p>
            <p className="first-letter:uppercase">{currentData?.email}</p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">phone:</p>
            <p className="first-letter:uppercase">{currentData?.phone}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex justify-evenly items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">gender </p>
            <p className="first-letter:uppercase">{currentData?.gender}</p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">marital status:</p>
            <p className="first-letter:uppercase">
              {currentData?.maritalStatus}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-l border-b border-b-mainColor">
            <p className="capitalize font-medium">religion:</p>
            <p className="first-letter:uppercase">{currentData?.religion}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex justify-evenly items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3 border-b border-r border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">place of birth </p>
            <p className="first-letter:uppercase">
              {currentData?.placeOfBirth}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">date Of birth:</p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.dateOfBirth).format("MMM D, YYYY")}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-l border-b border-b-mainColor">
            <p className="capitalize font-medium">nationality:</p>
            <p className="first-letter:uppercase">{currentData?.nationality}</p>
          </div>
        </article>

        {/* Single row */}
        <article className="flex gap-x-2.5">
          <p className="text-center border-r border-r-mainColor capitalize w-1/4 p-3 font-medium">
            address
          </p>
          <p className="first-letter:uppercase w-9/12 p-3">
            {currentData?.address}
          </p>
        </article>
        {/* Single row */}
        <article className="flex justify-evenly border-t items-center">
          <div className="flex gap-x-2  w-full justify-center  p-3  border-r border-r-mainColor ">
            <p className="capitalize font-medium">status </p>
            <p className="first-letter:uppercase">{currentData?.status}</p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 ">
            <p className="capitalize font-medium">job description:</p>
            <p className="first-letter:uppercase">
              {currentData?.jobDescription}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  justify-center p-3 border-l  ">
            <p className="capitalize font-medium">contract type:</p>
            <p className="first-letter:uppercase">
              {currentData?.contractType}
            </p>
          </div>
        </article>
      </article>
    </article>
  );
}

export default Profile;
