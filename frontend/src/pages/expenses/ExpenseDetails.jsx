import React, { useEffect } from "react";

import Btn from "../../components/Btn";
import Modal from "../../components/Modal";

import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";

import {
  useGetExpensesQuery,
  useDeleteExpensesMutation,
  useUpdateExpenseMutation,
} from "../../api/expenses";
import useToast from "../../hooks/useToast";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function ExpenseDetails() {
  const navigate = useNavigate();
  const { expenseId, id } = useParams();
  const { currentData, isError, isFetching, error, isSuccess } =
    useGetExpensesQuery(expenseId);

  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const [
    deleteExpense,
    {
      isError: deletingError,
      isLoading: deleting,
      error: deleteError,
      isSuccess: deleted,
    },
  ] = useDeleteExpensesMutation();
  const [
    updateExpense,
    {
      isError: updatingError,
      isLoading: updating,
      error: updateError,
      isSuccess: updated,
    },
  ] = useUpdateExpenseMutation();
  const updateExpenseStatus = () => {
    if (!getValues("status")) {
      setError("status", { type: "required" });
      return;
    }
    updateExpense({
      id: currentData?.id,
      status: getValues("status"),
    });
  };

  // Load content notification
  const {} = useToast(
    "get-single-expense",
    "",
    `${error?.data?.message}`,
    "query",
    isFetching,
    isSuccess,
    isError
  );

  // Update content notification
  const {} = useToast(
    "update-single-campaign",
    "Campaign updated successfully",
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    updatingError
  );
  // delete content notification
  const {} = useToast(
    "delete-single-campaign",
    "Campaign deleted successfully",
    `${deleteError?.data?.message}`,
    "mutation",
    deleting,
    deleted,
    deletingError
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
            {currentData?.user?.fullName}
          </h3>
        </div>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">amount:</p>
            <p className="first-letter:uppercase">
              &pound;{currentData?.amount}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">status:</p>
            <p className="first-letter:uppercase">{currentData?.status}</p>
          </div>
        </article>
        {/* Single row */}
        <article className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="flex gap-x-2  w-full lg:justify-center  p-3 border-b lg:border-r lg:border-r-mainColor border-b-mainColor">
            <p className="capitalize font-medium">submitted on </p>
            <p className="first-letter:uppercase">
              {dayjs(currentData?.createdAt).format("ddd, MMM D, YYYY")}
            </p>
          </div>
          <div className="flex gap-x-2 w-full  lg:justify-center p-3 border-b border-b-mainColor">
            <p className="capitalize font-medium">receipt number:</p>
            <p className="first-letter:uppercase">{currentData?.receiptNo}</p>
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
            style="bg-warning px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-altColor hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-altColor active:shadow-altColor"
            btnText={"Update status"}
            targetId="changeStatus"
            modalTitle={`Change request status`}
            confirmText="update"
            action={updateExpenseStatus}
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
                <option value="proccessing">Processing</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </Modal>
          {currentData?.image && (
            <a
              type="button"
              href={`${import.meta.env.VITE_BACKEND_LINK}/uploads/receipts/${
                currentData?.image
              }`}
              target="_blank"
              className="inline-block rounded bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
            >
              View receipt
            </a>
          )}
          <Modal
            style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
            btnText={`Delete campaign`}
            targetId="deleteExpense"
            modalTitle="Do you want to delete?"
            confirmText="delete"
            action={() => deleteExpense(currentData?.id)}
            // size="small"
          >
            <p>This will be deleted permanently</p>
          </Modal>
        </div>
      </article>
    </article>
  );
}

export default ExpenseDetails;
