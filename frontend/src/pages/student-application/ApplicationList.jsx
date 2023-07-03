import React from "react";
import Modal from "../../components/Modal";

import { useGetAllApplicantionsQuery } from "../../api/student-application";
import { useCreateStaffMutation } from "../../api/staff/staffApi";

import { Link, useNavigate } from "react-router-dom";
import generateRandomString from "../../lib/generatePassword";

import { useForm } from "react-hook-form";
import useToast from "../../hooks/useToast";
import Btn from "../../components/Btn";

function ApplicationList() {
  const navigate = useNavigate();
  const { currentData, isError, isFetching, isSuccess, error } =
    useGetAllApplicantionsQuery();

  // Load content notification
  const {} = useToast(
    "get-student-app",
    "Successfully loaded",
    `${error?.data?.message}`,
    "query",
    isFetching,
    isSuccess,
    isError
  );

  return (
    <article className="w-full  rounded-md p-3">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      s/n
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Fullname
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Age group
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.length > 0 ? (
                    currentData?.map((applicant, i) => (
                      <tr
                        key={applicant.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          <p
                            onClick={() => navigate(`${applicant.id}`)}
                            className="cursor-pointer"
                          >
                            {applicant.full_name}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          {applicant?.phone}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          {applicant?.age_group}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          {applicant.status}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase flex gap-x-2 items-center">
                          <Btn
                            text={"view"}
                            onClick={() => navigate(`${applicant.id}`)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="p-5 w-full">
                      <td colSpan={6} className="text-center text-xl py-6 ">
                        No record found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ApplicationList;
