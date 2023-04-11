import React, { useEffect } from "react";
import { useGetAllStaffQuery } from "../../api/staff/staffApi";
import { useNavigate, useParams } from "react-router-dom";
import { selectToken, getUserIdToken } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../components/Btn";
import { auth } from "../../config/firebase";

function AllStaffTimesheets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllStaffQuery();
  return (
    <article className="w-full p-5 md:p-10">
      <article className="w-full bg-white  rounded-md shadow-md">
        <div class="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
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
                      contract type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 first-letter:uppercase"
                    >
                      job role
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
                  {currentData?.map((staff, i) => (
                    <tr
                      key={staff.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i + 1}
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 cursor-pointer"
                        onClick={() => navigate(`${staff.id}`)}
                      >
                        {staff.fullName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {staff.contractType}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {staff.jobPosition}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-x-2">
                          <Btn
                            text={"timesheet"}
                            onClick={() =>
                              navigate(`/vms/${id}/admin/timesheet/${staff.id}`)
                            }
                          />
                          <Btn
                            text={"leave"}
                            onClick={() =>
                              navigate(`/vms/${id}/admin/timesheet/${staff.id}`)
                            }
                            color={2}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                contract type
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                job role
              </th>
              <th className="capitalize px-2 py-4 text-left font-semibold  ">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((staff, i) => (
              <tr
                key={staff.id}
                className="hover:bg-lightGreen p-3 cursor-pointer group"
              >
                <td className="w-ful text-left p-4 w-14">{i + 1}</td>
                <td className="w-ful text-left px-2 py-3 capitalize">
                  {staff.fullName}
                </td>
                <td className="w-ful text-left px-2 py-3 first-letter:uppercase">
                  {staff.contractType}
                </td>
                <td className="w-ful text-left px-2 py-3 first-letter:uppercase">
                  {staff.jobPosition}
                </td>
                <td className="w-ful text-left px-2 py-3 ">
                  <div className="flex gap-x-2">
                    <Btn
                      text={"timesheet"}
                      onClick={() =>
                        navigate(`/vms/${id}/admin/timesheet/${staff.id}`)
                      }
                    />
                    <Btn
                      text={"leave"}
                      onClick={() =>
                        navigate(`/vms/${id}/admin/timesheet/${staff.id}`)
                      }
                      color={2}
                    />
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

export default AllStaffTimesheets;
