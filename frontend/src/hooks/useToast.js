import React, { useEffect } from "react";
import { toast } from "react-toastify";

function useToast(
  id,
  successMessage,
  errorMessage,
  type,
  isFetching,
  isSuccess,
  isError
) {
  const customId = id;
  const notify = () => {
    toast.loading("Please wait", {
      toastId: customId,
    });
  };
  const alert = () => {
    toast(successMessage, {
      autoClose: 3000,
    });
  };
  const dismiss = () => toast.dismiss(customId);
  const success = () =>
    toast.update(customId, {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      render: successMessage,
      isLoading: false,
    });
  const error = () =>
    toast.update(customId, {
      type: toast.TYPE.ERROR,
      autoClose: 5000,
      render: errorMessage,
      isLoading: false,
    });
  useEffect(() => {
    // Notification
    if (isFetching) {
      notify();
    }
    if (isSuccess && type === "query") {
      dismiss();
    }
    if (isSuccess && type === "mutation") {
      success();
    }
    if (isError) {
      error();
    }
  }, [isError, isFetching, isSuccess]);
  return {
    notify,
    success,
    error,
    dismiss,
  };
}

export default useToast;
