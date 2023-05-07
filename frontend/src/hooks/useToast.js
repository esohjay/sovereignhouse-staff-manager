import React from "react";
import { toast } from "react-toastify";

function useToast(id, successMessage, errorMessage) {
  const customId = id;
  const notify = () => {
    toast.loading("Please wait", {
      toastId: customId,
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

  return {
    notify,
    success,
    error,
    dismiss,
  };
}

export default useToast;
