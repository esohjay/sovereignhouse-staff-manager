import React from "react";
import { useGetCampaignsQuery } from "../api/recruitment/campaignApi";
import { Link } from "react-router-dom";

function Campaigns() {
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetCampaignsQuery();
  return (
    <article className="w-full overflow-x-scroll  md:overflow-x-hidden rounded-md  scrollbar">
      <table className="w-full">
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
            <tr className="hover:bg-lightGreen p-3 cursor-pointer group">
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
      </table>
    </article>
  );
}

export default Campaigns;
