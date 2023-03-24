import React from "react";
import { useGetCampaignsQuery } from "../../api/recruitment/campaignApi";
import { Link, useNavigate } from "react-router-dom";
import { FaCogs, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineOpenInFull } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useForm } from "react-hook-form";

import Btn from "../../components/Btn";
import Modal from "../../components/Modal";

function Campaigns() {
  const navigate = useNavigate();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetCampaignsQuery();
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
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Contract
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Applicants
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.map((campaign, i) => (
                    <tr
                      key={campaign.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        <p
                          onClick={() => navigate(`${campaign.id}`)}
                          className="cursor-pointer"
                        >
                          {campaign.title}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {campaign.position}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {campaign.contractType}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {campaign.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {campaign.Applicants?.length}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase flex gap-x-2 items-center">
                        <Link className="" to={`${campaign.id}/edit`}>
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
                                value: campaign.id,
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
                          modalTitle={`Delete ${campaign?.title}?`}
                          confirmText="delete"
                          btn={false}
                          // action={updateLeaveStatus}
                          // size="small"
                        >
                          <p className="first-letter:uppercase">
                            {campaign?.title} will be deleted permanently
                          </p>
                        </Modal>
                        {/* <Btn
                          text={<FaCogs />}
                          id="actionOptions"
                          data-te-dropdown-toggle-ref
                          aria-expanded="false"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        />
                        <ul
                          className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:grid grid-cols-3 place-items-center"
                          aria-labelledby="actionOptions"
                          data-te-dropdown-menu-ref
                        >
                          <li>
                            <Link
                              className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                              to={`${campaign.id}`}
                              data-te-dropdown-item-ref
                            >
                              <MdOutlineOpenInFull />
                            </Link>
                          </li>
                          <li>
                           
                          </li>
                          <li>
                            <a
                              className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-warning hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                              href="#"
                              data-te-dropdown-item-ref
                            >
                              <Modal
                                style="whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-black hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                                cta={<HiOutlineStatusOnline />}
                                targetId="changeStatus"
                                modalTitle={`Change campaign status`}
                                confirmText="update"
                                // action={updateLeaveStatus}
                                // size="small"
                              >
                                <div className="w-full">
                                  <input
                                    type="text"
                                    {...register("id", {
                                      required: true,
                                      value: campaign.id,
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
                                    <option value="approved">Active</option>
                                    <option value="unapproved">Inactive</option>
                                  </select>
                                </div>
                              </Modal>
                            </a>
                          </li>
                          <li>
                            <a
                              className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-danger hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                              href="#"
                              data-te-dropdown-item-ref
                            >
                             
                            </a>
                          </li>
                        </ul> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <table className="w-full">
        <thead className="">
          <tr className="bg-gray">
            <th className="capitalize p-4 text-left font-semibold w-1">s/n</th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[280px">
              title
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[180px">
              position
            </th>
            <th className="capitalize px-2 py-4 text-left font-semibold w-[180px">
              contract type
            </th>
            <th className="capitalize px-2 py-4 font-semibold w-[280px text-left">
              status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((campaign, i) => (
            <tr
              key={campaign.id}
              className="hover:bg-lightGreen p-3 cursor-pointer group"
            >
              <td className="w-ful text-left p-4 -14">{i + 1}</td>
              <td className="w-ful text-left px-2 py-3 w-[280px">
                <p className="mb-1">{campaign.title}</p>
                <div className="hidden group-hover:flex group-hover:gap-2 w-full">
                  <Link
                    to={`/admin/recruitment/${campaign.id}`}
                    className="text-mainColor p-1 text-xs inline-block rounded-md border border-mainColor fornt-medium capitalize"
                  >
                    view
                  </Link>
                  <Link
                    to={`/admin/recruitment/${campaign.id}/edit`}
                    className="text-mainColor p-1 text-xs inline-block rounded-md border border-yellow-500 fornt-medium capitalize"
                  >
                    edit
                  </Link>
                </div>
              </td>
              <td className="w-ful text-left px-2 py-3 w-[180px">
                {campaign.position}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[180px">
                {campaign.contractType}
              </td>
              <td className="w-ful text-left px-2 py-3 w-[280px">
                {campaign.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </article>
  );
}

export default Campaigns;
