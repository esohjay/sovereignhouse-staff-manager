import React from "react";

import Btn from "../../components/Btn";
import Modal from "../../components/Modal";

import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";

import {
  useGetCampaignQuery,
  useDeleteCampaignMutation,
  useUpdateCampaignMutation,
} from "../../api/recruitment/campaignApi";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function CampaignDetails() {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetCampaignQuery(campaignId);

  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const [deleteCampaign, { status }] = useDeleteCampaignMutation();
  const [updateCampaign, { status: updateStatus }] =
    useUpdateCampaignMutation();
  const updateCampaignStatus = () => {
    if (!getValues("status")) {
      setError("status", { type: "required" });
      return;
    }
    updateCampaign({
      id: currentData?.id,
      status: getValues("status"),
    });
  };
  return (
    <article className="p-2 lg:px-5 lg:py-10 space-y-3">
      <Btn text={"back"} onClick={() => navigate(-1)} />
      <article className="border rounded-md border-mainColor mb-5">
        <div className="p-3 border-b border-b-mainColor">
          <h3 className="text-center font-semibold text-mainColor capitalize p-3">
            {currentData?.position}
          </h3>
        </div>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">department:</p>
            <p className="first-letter:uppercase">{currentData?.department}</p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">workplace:</p>
            <p className="first-letter:uppercase">{currentData?.workplace}</p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">no of candidates:</p>
            <p className="first-letter:uppercase">
              {currentData?.numberOfCandidates}
            </p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">start date </p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.startDate).format("ddd, MMM D, YYYY")}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">end date:</p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.endDate).format("ddd, MMM D, YYYY")}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 lg:border-l border-b border-b-mainColor">
            <p className="capitalize font-medium">duration :</p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.endDate).diff(currentData?.startDate, "d")}
              days
            </p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center lg:h-16">
          <div className="flex lg:h-full gap-x-2  w-full lg:items-center lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">contract type </p>
            <p className="first-letter:uppercase">
              {currentData?.contractType}
            </p>
          </div>
          <div className="flex  lg:h-full gap-x-2 w-full  lg:items-center lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">status:</p>
            <p className="first-letter:uppercase">{currentData?.status}</p>
          </div>

          <div
            className={`flex lg:h-full gap-x-2 w-full  lg:justify-center p-3 lg:border-l lg:items-center border-b border-b-mainColor `}
          >
            <p className="capitalize font-medium">update status:</p>
            <Modal
              style="bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-altColor hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
              btnText={"click to update"}
              targetId="changeStatus"
              modalTitle={`Change request status`}
              confirmText="update"
              action={updateCampaignStatus}
              // size="small"
            >
              <div className="w-full">
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
          </div>
        </article>

        {/* Single row */}
        <article className="flex flex-col lg:flex-row gap-x-2.5 border-b border-b-mainColor">
          <p className="md:text-center lg:border-r lg:border-r-mainColor capitalize md:w-1/4 p-3 font-medium">
            description:
          </p>
          <p className="first-letter:uppercase w-9/12 p-3">
            {currentData?.description}
          </p>
        </article>
      </article>
      <article className="items-center lg:flex-row flex-col gap-3 flex">
        <div className="h-full flex gap-2 items-center justify-items-center">
          <button
            type="button"
            onClick={() => navigate("edit")}
            className="inline-block rounded bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
          >
            Edit details
          </button>

          <Modal
            style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
            btnText={`Delete campaign`}
            targetId="deleteCampaign"
            modalTitle="Do you want to delete?"
            confirmText="delete"
            action={() => deleteCampaign(currentData?.id)}
            // size="small"
          >
            <p>This will be deleted permanently</p>
          </Modal>
        </div>
      </article>
    </article>
  );
}

export default CampaignDetails;
