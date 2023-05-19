import React, { useEffect } from "react";
import { useGetAllStaffQuery } from "../../api/staff/staffApi";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowDown, MdOutlineOpenInFull } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../config/firebase";

import useToast from "../../hooks/useToast";

function AllStaff() {
  const dispatch = useDispatch();
  const { notify, error, dismiss } = useToast("01", "Success", "Fail");

  const { id } = useParams();
  const {
    currentData,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    error: err,
  } = useGetAllStaffQuery();
  if (isFetching) {
    notify();
  }
  if (isError) {
    error();
  }
  if (isSuccess) {
    dismiss();
  }
  console.log(err);
  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium bg-neutral-50  dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Fullname
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap ">
                    Contract type
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap ">
                    Job role
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData?.length > 0 ? (
                  currentData?.map((staff, i) => (
                    <tr
                      key={staff.id}
                      className="border-b dark:border-neutral-500 group"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i + 1}
                      </td>
                      <td
                        className="whitespace-nowrap  px-6 py-4 capitalize cursor-pointer"
                        data-te-dropdown-ref
                      >
                        <p
                          type="button"
                          id="actionOptions"
                          data-te-dropdown-toggle-ref
                          aria-expanded="false"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          className="flex gap-x-1 items-center"
                        >
                          {staff.fullName}
                          <MdKeyboardArrowDown />
                        </p>

                        <ul
                          className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:grid grid-cols-2 place-items-center"
                          aria-labelledby="actionOptions"
                          data-te-dropdown-menu-ref
                        >
                          <li>
                            <Link
                              className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                              to={`/vms/${id}/admin/staff/${staff.id}`}
                              data-te-dropdown-item-ref
                            >
                              <MdOutlineOpenInFull />
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                              to={`/vms/${id}/admin/staff/${staff.id}/edit`}
                              data-te-dropdown-item-ref
                            >
                              <FaEdit />
                            </Link>
                          </li>
                        </ul>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {staff.phone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {staff.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {staff.gender}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {staff.contractType}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {staff.jobPosition}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize">
                        {staff.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="p-5 w-full">
                    <td colSpan={8} className="text-center text-xl py-6 ">
                      No staff records yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStaff;
