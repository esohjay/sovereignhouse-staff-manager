import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateKnowledgeBaseMutation } from "../../api/staff/knowlege-base-api";
import useToast from "../../hooks/useToast";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";

function AddKB() {
  const navigate = useNavigate();
  const [createKB, { error, isLoading, isSuccess, isError }] =
    useCreateKnowledgeBaseMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createKB(data);
  };
  const {} = useToast(
    "add-KB",
    "Item added successfully",
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
    <article className="w-full px-5 py-10">
      <Btn text="back" onClick={() => navigate(-1)} />
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        <article className="w-full grid md:grid-cols-3 gap-x-3">
          {/* task name */}
          <div className="mb-3">
            <label
              htmlFor="name"
              className="capitalize font-medium mb-1 block text-sm"
            >
              article name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.name && (
              <span className="text-red-500 ">name is required</span>
            )}
          </div>
          {/* priority */}
          <div className="mb-3 w-full">
            <label
              htmlFor="group"
              className="capitalize font-medium mb-1 block text-sm"
            >
              group
            </label>
            <select
              {...register("group", { required: true })}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select group</option>
              <option value="employee">Employee</option>
              <option value="volunteer">Volunteer</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="other">Other</option>
            </select>
            {errors.group && (
              <span className="text-red-500">group is required</span>
            )}
          </div>
        </article>

        {/* link */}
        <div className="mb-3">
          <label
            htmlFor="link"
            className="capitalize font-medium mb-1 block text-sm"
          >
            link
          </label>
          <textarea
            type="text"
            {...register("link", { required: true })}
            rows="7"
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.link && (
            <span className="text-red-500">link is required</span>
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

export default AddKB;
