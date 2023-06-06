import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import useToast from "../../hooks/useToast";
import {
  useCreateExpenseMutation,
  useUploadReceiptMutation,
} from "../../api/expenses";

function AddExpenses() {
  const [createExpense, { error, isLoading, isSuccess, isError }] =
    useCreateExpenseMutation();
  const { id } = useParams();
  const [uploadReceipt, { data: receipt, isSuccess: uploaded }] =
    useUploadReceiptMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!receipt) {
      setError("file", { type: "required" });
      return;
    }

    createExpense({
      ...data,
      image: receipt.fileSrc,
      userId: id,
      status: "pending",
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 5) {
      alert("File size too large");
      return;
    }
    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      "image/jpeg" ||
      "image/png"
    ) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      uploadReceipt(bodyFormData);
    } else {
      alert("File format not allowed");
      return;
    }
  };

  // Notification
  const {} = useToast(
    "request-leaf",
    "Request submitted successfully",
    `${error?.data?.message}`,
    "mutation",
    isLoading,
    isSuccess,
    isError
  );

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);
  return (
    <article className="w-full p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="w-full grid md:grid-cols-2 gap-x-3">
          {/* amount*/}
          <div className="mb-3">
            <label
              htmlFor="amount"
              className="capitalize font-medium mb-1 block text-sm"
            >
              Amount &#40;&pound;&#41;
            </label>
            <input
              type="number"
              {...register("amount", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.amount && (
              <span className="text-red-500 ">amount is required</span>
            )}
          </div>
          {/* amount*/}
          <div className="mb-3">
            <label
              htmlFor="receiptNo"
              className="capitalize font-medium mb-1 block text-sm"
            >
              receipt number
            </label>
            <input
              type="text"
              {...register("receiptNo", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.receiptNo && (
              <span className="text-red-500 ">receipt number is required</span>
            )}
          </div>
        </article>
        <div className="mb-5">
          <label>
            <label
              htmlFor="receipt"
              className="block mb-2 font-semibold text-sm"
            >
              Upload Receipt
            </label>
            <input
              type="file"
              id="receipt"
              disabled={status === "pending"}
              onChange={handleFileUpload}
              className="text-sm text-grey-500 file:border-2 file:border-transparent file:mr-3 file:py-1 file:px-3 file:text-sm 
                file:rounded-md file:transition-all file:duration-500 file:font-medium file:bg-mainColor file:text-white
                hover:file:cursor-pointer hover:file:bg-white  hover:file:text-mainColor hover:file:border-mainColor 
          "
            />
          </label>
          {uploaded && (
            <span className="text-green-500 ">Receipt uploaded</span>
          )}
          {errors.file && !receipt && (
            <span className="text-red-500 ">Upload your receipt</span>
          )}
        </div>

        {/* description */}
        <div className="mb-3">
          <label
            htmlFor="description"
            className="capitalize font-medium mb-1 block text-sm"
          >
            description
          </label>
          <textarea
            type="text"
            {...register("description", { required: true })}
            rows="7"
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.description && (
            <span className="text-red-500">description is required</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6"
        >
          submit
        </button>
      </form>
    </article>
  );
}

export default AddExpenses;
