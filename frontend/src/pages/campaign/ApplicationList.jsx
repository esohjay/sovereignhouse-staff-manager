import React from "react";
import Modal from "../../components/Modal";

import {
  useGetApplicationsQuery,
  useDeleteApplicantMutation,
  useUpdateApplicationMutation,
  useSetInterviewMutation,
} from "../../api/recruitment/campaignApi";
import { useCreateStaffMutation } from "../../api/staff/staffApi";

import { Link, useNavigate } from "react-router-dom";
import generateRandomString from "../../lib/generatePassword";

import { useForm } from "react-hook-form";
import useToast from "../../hooks/useToast";
import Btn from "../../components/Btn";

function ApplicationList() {
  const navigate = useNavigate();
  const { currentData, isError, isFetching, isSuccess, error } =
    useGetApplicationsQuery();
  const [
    registerStaff,
    {
      isError: errorAddingStaff,
      isLoading: addingStaff,
      isSuccess: staffAdded,
      error: addStaffError,
    },
  ] = useCreateStaffMutation();
  const [
    deleteApplicant,
    {
      isError: deleteError,
      isLoading: deleting,
      isSuccess: deleted,
      error: deleteErrorMessage,
    },
  ] = useDeleteApplicantMutation();
  const [
    updateApplication,
    {
      isError: errorUpdating,
      isLoading: updating,
      isSuccess: updated,
      error: updateError,
    },
  ] = useUpdateApplicationMutation();

  const [
    setupInterview,
    {
      isError: interviewError,
      isLoading: interviewLoading,
      isSuccess: interviewSuccess,
      error: interviewErrorMessage,
    },
  ] = useSetInterviewMutation();
  const {
    register: register2,
    handleSubmit,
    getValues: getValues2,
    setError: setError2,
    formState: { errors },
    reset,
  } = useForm();
  const updateApplicationStage = (application) => {
    if (!getValues2("status")) {
      setError2("status", { type: "required" });
      return;
    }
    if (
      getValues2("status") === "accepted" &&
      application?.status !== "accepted"
    ) {
      const password = generateRandomString();
      registerStaff({
        password,
        firstName: application?.firstName,
        lastName: application?.lastName,
        gender: application?.gender,
        phone: application?.phone,
        email: application?.email,
        address: application?.address,
        jobPosition: application?.Campaign?.position,
        contractType: application?.Campaign?.contractType,
      });
    }
    updateApplication({
      id: application.id,
      status: getValues2("status"),
    });
  };
  const scheduleInterview = (application) => {
    if (!getValues2("message")) {
      setError2("message", { type: "required" });
      return;
    }
    if (!getValues2("link")) {
      setError2("link", { type: "required" });
      return;
    }
    setupInterview({
      id: application?.id,
      link: getValues2("link"),
      message: getValues2("message"),
      email: application?.email,
      status: "interviewing",
      name: application.firstName,
    });
  };
  // Load content notification
  const {} = useToast(
    "get-single-campaign",
    "Successfully loaded",
    `${error?.data?.message}`,
    "query",
    isFetching,
    isSuccess,
    isError
  );

  // set up interview
  const {} = useToast(
    "set-interview-applicant",
    "Interview details sent",
    `${interviewErrorMessage?.data?.message}`,
    "mutation",
    interviewLoading,
    interviewSuccess,
    interviewError
  );

  // Delete content notification
  const {} = useToast(
    "delete-single-application",
    `Application deleted`,
    `${deleteErrorMessage?.data?.message}`,
    "mutation",
    deleting,
    deleted,
    deleteError
  );
  // Update content notification
  const {} = useToast(
    "update-single-application",
    `Application updated`,
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    errorUpdating
  );
  //Add as staff notification
  const {} = useToast(
    "add-as-staff",
    `Applicant has been added as staff`,
    `${addStaffError?.data?.message}`,
    "mutation",
    addingStaff,
    staffAdded,
    errorAddingStaff
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
                          <Btn
                            text={"view"}
                            onClick={() => navigate(`${applicant.id}`)}
                          />
                          {/* <Modal
                            style="bg-warning px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-warning transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
                            btnText={"status"}
                            targetId={`changeStatus${applicant.id}`}
                            modalTitle={`Update application stage`}
                            confirmText="update"
                            action={() => updateApplicationStage(applicant)}
                            // size="small"
                          >
                            <div className="w-full">
                              <select
                                data-te-select-init
                                {...register2("status", { required: true })}
                                className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
                              >
                                <option value="">Update stage</option>
                                <option value="pending">Pending</option>
                                <option value="interviewing">
                                  Interviewing
                                </option>
                                <option value="documentation">
                                  Documentation
                                </option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </div>
                          </Modal>
                          <Modal
                            style="bg-mainColor px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-warning transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
                            btnText={"interview"}
                            targetId={`interview${applicant.id}`}
                            modalTitle={`Send invterview message`}
                            confirmText="send"
                            action={() => scheduleInterview(applicant)}
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
                                {...register2("message", {
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
                                {...register2("link", {
                                  required: true,
                                })}
                                className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
                              ></input>
                            </div>
                          </Modal>
                          <Modal
                            style="bg-danger px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
                            btnText={`Delete`}
                            targetId={`deleteApplicant${applicant.id}`}
                            modalTitle="Do you want to delete?"
                            confirmText="delete"
                            action={() => deleteApplicant(applicant.id)}
                            // size="small"
                          >
                            <p>This will be deleted permanently</p>
                          </Modal> */}
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
