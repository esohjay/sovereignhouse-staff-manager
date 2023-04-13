import React from "react";
import Modal from "../../components/Modal";

import { useGetApplicationsQuery } from "../../api/recruitment/campaignApi";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineOpenInFull } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useForm } from "react-hook-form";

function ApplicationList() {
  const navigate = useNavigate();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetApplicationsQuery();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm();
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
                      Position
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Contract
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Stage
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.map((applicant, i) => (
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
                          {applicant.fullName}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {applicant?.Campaign?.position}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {applicant?.Campaign?.contractType}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {applicant.status}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase flex gap-x-2 items-center">
                        <Link className="" to={`${applicant.id}/edit`}>
                          <FaEdit />
                        </Link>
                        <Modal
                          style="whitespace-nowrap bg-transparent text-sm font-normal text-black hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          cta={<HiOutlineStatusOnline />}
                          targetId="changeStatus"
                          modalTitle={`Change campaign status`}
                          confirmText="update"
                          btn={false}
                          // action={updateLeaveStatus}
                          // size="small"
                        >
                          <div className="w-full">
                            <input
                              type="text"
                              {...register("id", {
                                required: true,
                                value: applicant.id,
                              })}
                              hidden
                            />
                            <select
                              data-te-select-init
                              {...register("status", { required: true })}
                              className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
                            >
                              <option value="">Update status</option>
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </Modal>
                        <Modal
                          style="whitespace-nowrap bg-transparent  text-sm font-normal text-black hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          cta={<FaTrashAlt />}
                          targetId="deleteCampaign"
                          modalTitle={`Delete ${applicant?.title}?`}
                          confirmText="delete"
                          btn={false}
                          // action={updateLeaveStatus}
                          // size="small"
                        >
                          <p className="first-letter:uppercase">
                            {applicant?.title} will be deleted permanently
                          </p>
                        </Modal>
                      </td>
                    </tr>
                  ))}
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
