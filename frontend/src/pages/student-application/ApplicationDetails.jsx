import React, { useEffect } from "react";

import Btn from "../../components/Btn";
import Modal from "../../components/Modal";

import { useNavigate, useParams } from "react-router-dom";

import {
  useDeleteApplicationMutation,
  useGetApplicantionQuery,
  useUpdateStudentApplicationMutation,
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
  const [
    updateApplication,
    {
      isError: errorUpdating,
      isLoading: updating,
      isSuccess: updated,
      error: updateError,
    },
  ] = useUpdateStudentApplicationMutation();

  const {
    register: registerStudent,
    handleSubmit,
    getValues: getValuesStudent,
    setError: setErrorStudent,
    formState: { errors },
  } = useForm();

  const updateStudentApplicationStage = () => {
    if (!getValuesStudent("student_status")) {
      setErrorStudent("student_status", { type: "required" });
      return;
    }

    updateApplication({
      id: currentData?.id,
      email: currentData?.email,
      first_name: currentData?.first_name,
      status: getValuesStudent("student_status"),
    });
  };

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
    `${currentData?.first_name}'s application deleted`,
    `${deleteErrorMessage?.data?.message}`,
    "mutation",
    deleting,
    deleted,
    deleteError
  );
  // Update content notification
  // Update content notification
  const {} = useToast(
    "update-single-student-application",
    `Application updated`,
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    errorUpdating
  );
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
              age category
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
          <div className="flex gap-x-2 flex-col w-full border-l border-l-mainColor lg:justify-center p-3  ">
            <p className="capitalize font-xs md:text-sm font-semibold">
              status
            </p>
            <p className="first-letter:uppercase">{currentData?.status}</p>
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
        {currentData?.age_group !== "adult" && (
          <section>
            <article className="flex flex-col lg:flex-row justify-evenly items-center border-t border-b-mainColor">
              <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  school
                </p>
                <p className="first-letter:uppercase">{currentData?.school}</p>
              </div>
              <div className="flex gap-x-2 flex-col w-full  lg:justify-center p-3 border-r border-r-mainColor">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  class
                </p>
                <p className="first-letter:uppercase">{currentData?.class}</p>
              </div>
              <div className="flex gap-x-2 w-full flex-col lg:justify-center p-3 ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  gp surgery
                </p>
                <p className="first-letter:uppercase">
                  {currentData?.gp_surgery}
                </p>
              </div>
            </article>
            <article className="flex flex-col lg:flex-row justify-evenly border-t items-center  ">
              <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  parent name
                </p>
                <p className="first-letter:uppercase">
                  {currentData?.parent_name}
                </p>
              </div>
              <div className="flex gap-x-2 flex-col w-full  lg:justify-center p-3  ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  parent address
                </p>
                <p className="first-letter:uppercase">
                  {currentData?.parent_address}
                </p>
              </div>
            </article>
            <article className="flex flex-col lg:flex-row justify-evenly border-t items-center  ">
              <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  emergency contact name
                </p>
                <p className="first-letter:uppercase">
                  {currentData?.emergency_contact_name}
                </p>
              </div>
              <div className="flex gap-x-2 flex-col w-full  lg:justify-center p-3  ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  emergency contact phone
                </p>
                <p className="first-letter:uppercase">
                  {currentData?.emergency_contact_phone}
                </p>
              </div>
            </article>
            <article className="flex flex-col lg:flex-row justify-evenly border-y items-center  ">
              <div className="flex gap-x-2 flex-col  w-full lg:justify-center  p-3  lg:border-r lg:border-r-mainColor ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  learning needs
                </p>
                <p className="first-letter:uppercase">
                  {currentData?.learning_needs}
                </p>
              </div>
              <div className="flex gap-x-2 flex-col w-full  lg:justify-center p-3  ">
                <p className="capitalize font-xs md:text-sm font-semibold">
                  allergies
                </p>
                <p className="first-letter:uppercase">
                  {currentData?.allergies}
                </p>
              </div>
            </article>
            <article className="w-full  rounded-md px-10">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              AI
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Selection
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Iteration
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Motion
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Events
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Variables
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Python
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Hardware
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4  whitespace-nowrap"
                            >
                              E-Safety
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              HTML/CSS
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              Input/Output
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              Game design
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              Programming construct
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {currentData?.ai}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.selection}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.iteration}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.motions}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.events}
                              </td>

                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.variables}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.pyhton}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.hardware}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.e_safety}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.html_css}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.inputs_outputs}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.game_design}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase text-center">
                                {currentData?.programming_constructs}
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}
      </article>
      <article className="flex gap-4 py-6">
        <Modal
          style="bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-warning transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
          btnText={"update application stage"}
          targetId="changeApplicationStatusstudent"
          modalTitle={`Update application stage`}
          confirmText="update"
          action={updateStudentApplicationStage}
          // size="small"
        >
          <div className="w-full">
            <select
              data-te-select-init
              {...registerStudent("student_status", { required: true })}
              className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
            >
              <option value="">Update stage</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </Modal>
        <Modal
          style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
          btnText={`Delete application`}
          targetId="deleteApplicantion"
          modalTitle="Do you want to delete?"
          confirmText="delete"
          action={() => deleteApplicant(currentData?.id)}
          // size="small"
        >
          <p>This will be deleted permanently</p>
        </Modal>
      </article>
    </article>
  );
}

export default ApplicantDetails;
