import React, { useEffect } from "react";
import Btn from "../../components/Btn";

import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { setDay } from "../../lib/setDay";

import useToast from "../../hooks/useToast";

import {
  useGetKnowledgeBaseQuery,
  useUpdateKnowledgeBaseMutation,
  useDeleteKnowledgeBaseMutation,
} from "../../api/staff/knowlege-base-api";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

function EditKB() {
  const navigate = useNavigate();
  const { kbId } = useParams();
  const { currentData } = useGetKnowledgeBaseQuery(kbId);

  const [
    updateKnowledgeBase,
    {
      isError: updatingError,
      isLoading: updating,
      error: updateError,
      isSuccess: updated,
    },
  ] = useUpdateKnowledgeBaseMutation();

  const [
    deleteArticle,
    {
      isError: deletingError,
      isLoading: deleting,
      error: deleteError,
      isSuccess: deleted,
    },
  ] = useDeleteKnowledgeBaseMutation();
  // Update shift notification
  const {} = useToast(
    "update-article-1-request",
    "Article updated successfully",
    `${updateError?.data?.message}`,
    "mutation",
    updating,
    updated,
    updatingError
  );
  // delete article notification
  const {} = useToast(
    "delete-article",
    "Article deleted successfully",
    `${deleteError?.data?.message}`,
    "mutation",
    deleting,
    deleted,
    deletingError
  );
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    updateKnowledgeBase({
      ...data,
      id: currentData?.id,
      dayOfTheWeek: parseInt(data.dayOfTheWeek),
    });
  };
  useEffect(() => {
    if (updated || deleted) {
      navigate(-1);
    }
  }, [updated, deleted]);
  return (
    <>
      {currentData && (
        <article className="w-full p-5">
          <Btn text="back" onClick={() => navigate(-1)} />
          <h3 className="text-center font-semibold text-mainColor mb-5">
            Update {currentData?.title}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className="w-full grid md:grid-cols-3 gap-x-3">
              {/* article name */}
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="capitalize font-medium mb-1 block text-sm"
                >
                  article name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                    value: `${currentData?.name}`,
                  })}
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
                  {...register("group", {
                    required: true,
                    value: `${currentData?.group}`,
                  })}
                  className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
                >
                  <option value={`${currentData?.group}`}>
                    {currentData?.group}
                  </option>
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
                {...register("link", {
                  required: true,
                  value: `${currentData?.link}`,
                })}
                rows="7"
                className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
              />
              {errors.link && (
                <span className="text-red-500">link is required</span>
              )}
            </div>
            <div className="flex justify-start items-center gap-5">
              <button
                type="submit"
                disabled={updating}
                className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6"
              >
                submit
              </button>
              <Modal
                style="bg-danger px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
                btnText={`Delete article`}
                targetId="deleteArticle"
                modalTitle="Do you want to delete?"
                confirmText="delete"
                action={() => deleteArticle(currentData?.id)}
                // size="small"
              >
                <p>This will be deleted permanently</p>
              </Modal>
            </div>
          </form>
        </article>
      )}
    </>
  );
}

export default EditKB;
