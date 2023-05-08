import React, { useState } from "react";
import useToast from "../../hooks/useToast";
import {
  useGetCampaignsQuery,
  useDeleteCampaignMutation,
  useUpdateCampaignMutation,
} from "../../api/recruitment/campaignApi";
import { Link, useNavigate } from "react-router-dom";
import { FaCogs, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineOpenInFull } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useForm } from "react-hook-form";

import Btn from "../../components/Btn";
import Modal from "../../components/Modal";

function Campaigns() {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [copiedCampaign, setCopiedCampaign] = useState("");
  const { currentData, isError, isFetching, isSuccess, error } =
    useGetCampaignsQuery();
  // Load content notification
  const {} = useToast(
    "get-all-campaigns",
    "Successfully loaded",
    `${error?.data?.message}`,
    "query",
    isFetching,
    isSuccess,
    isError
  );
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  //copy link to clipboard
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  const handleCopyClick = (id) => {
    // Asynchronously call copyTextToClipboard
    setCopiedCampaign(id);
    copyTextToClipboard(`${import.meta.env.VITE_FRONTEND_URL}/${id}/apply`)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                          {campaign.position}
                        </p>
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
                        <button
                          type="button"
                          onClick={() => navigate(`${campaign.id}`)}
                          className="inline-block rounded bg-mainColor px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
                        >
                          view
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`${campaign.id}/edit`)}
                          className="inline-block rounded bg-warning px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
                        >
                          edit
                        </button>

                        {/* <Modal
                          style="whitespace-nowrap bg-transparent text-sm font-normal text-black hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          targetId="changeCampaignStatus"
                          modalTitle={`Change campaign status`}
                          confirmText="update"
                          btnText={`copy`}
                          action={updateCampaignStatus}
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
                        </Modal> */}
                        <Modal
                          style="bg-mainColor px-3 pt-1.5 pb-1 text-[9px] font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
                          btnText={
                            isCopied && copiedCampaign === campaign.id
                              ? "copied"
                              : "copy"
                          }
                          targetId="copyLink"
                          modalTitle="Copy campaign link"
                          confirmText="copy"
                          action={() => handleCopyClick(campaign.id)}
                          // size="small"
                        >
                          <div
                            className="w-full"
                            onDoubleClick={() => handleCopyClick(campaign.id)}
                          >
                            <input
                              data-te-select-init
                              disabled
                              {...register("campaignLink", {})}
                              value={`${import.meta.env.VITE_FRONTEND_URL}/${
                                campaign.id
                              }/apply`}
                              className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
                            />
                          </div>
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

export default Campaigns;
