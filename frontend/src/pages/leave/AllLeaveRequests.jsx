import React, { useEffect } from "react";
import {
  useGetLeaveRequestsQuery,
  useUpdateLeaveMutation,
} from "../../api/leave/leaveApi";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaRegCommentDots } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";

import Modal from "../../components/Modal";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function AllLeaveRequests() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetLeaveRequestsQuery();
  const [updateLeave, result] = useUpdateLeaveMutation();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    if (!getValues("status")) {
      setError("status", { type: "required" });
      return;
    }
    updateLeave({ status: getValues("status") });
  };
  const updateLeaveStatus = () => {
    if (!getValues("status")) {
      setError("status", { type: "required" });
      return;
    }
    updateLeave({ status: getValues("status"), id: getValues("id") });
  };
  const leaveComment = () => {
    if (!getValues("statusMessage")) {
      setError("statusMessage", { type: "required" });
      return;
    }
    updateLeave({
      statusMessage: getValues("statusMessage"),
      id: getValues("id"),
    });
  };
  return (
    <article className="w-full p-5 md:p-10">
      <article className="w-full bg-white  rounded-md shadow-md">
        <div class="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        {" "}
                        s/n
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        fullname
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        leave type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        start date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        end date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 first-letter:uppercase"
                      >
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData?.map((leave, i) => (
                      <tr
                        key={leave.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {i + 1}
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 cursor-pointer"
                          onClick={() => navigate(`${leave.id}`)}
                        >
                          {leave.user.fullName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          {leave.type}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {dayjs(leave.startDate).format("MMM D, YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {dayjs(leave.endDate).format("MMM D, YYYY")}

                          {/* <p className="text-xs">
                            {" "}
                            &#40;
                            {dayjs(leave.endDate).diff(
                              leave.startDate,
                              "d"
                            )}{" "}
                            days &#41;
                          </p> */}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                          {leave.status}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="flex gap-x-2 items-center">
                            <Modal
                              style="bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-altColor hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
                              btnText={<BiEditAlt />}
                              targetId="changeStatus"
                              modalTitle={`Change request status`}
                              confirmText="update"
                              action={updateLeaveStatus}
                              // size="small"
                            >
                              <div className="w-full">
                                <input
                                  type="text"
                                  {...register("id", {
                                    required: true,
                                    value: leave.id,
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
                                  <option value="approved">Approved</option>
                                  <option value="unapproved">Unapproved</option>
                                </select>
                              </div>
                            </Modal>
                            <Modal
                              style="bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
                              btnText={<FaRegCommentDots />}
                              targetId="leaveComment"
                              modalTitle={`Leave a comment`}
                              confirmText="send"
                              action={leaveComment}
                              // size="small"
                            >
                              <input
                                type="text"
                                {...register("id", {
                                  required: true,
                                  value: leave.id,
                                })}
                                hidden
                              />
                              <textarea
                                {...register("statusMessage", {
                                  required: true,
                                })}
                                rows="5"
                                className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
                              ></textarea>
                            </Modal>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <table className="w-full table-auto ">
          <thead className="">
            <tr className="bg-gray">
              <th className="capitalize p-4 text-left font-semibold w-14">
                s/n
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold ">
                fullname
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold ">
                leave type
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                duration
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                status
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((leave, i) => (
              <tr
                key={leave.id}
                className="hover:bg-lightGreen p-3 cursor-pointer group"
              >
                <td className="w-ful text-left p-4 w-14">{i + 1}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  {leave.user.fullName}
                </td>
                <td className="w-ful text-left px-2 py-3 ">{leave.type}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  {leave.startDate.substring(0, 10)} -{" "}
                  {leave.endDate.substring(0, 10)}
                </td>
                <td className="w-ful text-left px-2 py-3 ">{leave.status}</td>
                <td className="w-ful text-left px-2 py-3 ">
                  <div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex gap-x-2"
                    >
                      <input
                        type="text"
                        {...register("id", { required: true, value: leave.id })}
                        hidden
                      />
                      <select {...register("status", { required: true })}>
                        <option value="">Update status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="unapproved">Unapproved</option>
                      </select>
                      <button className="inline-block p-1 rounded-md bg-mainColor text-white text-xs">
                        Update
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </article>
    </article>
  );
}

export default AllLeaveRequests;
