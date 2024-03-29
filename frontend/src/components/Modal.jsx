import React from "react";

function Modal({
  btnText,
  targetId,
  modalTitle,
  confirmText,
  action,
  style,
  size,
  btn,
  cta,
  children,
}) {
  return (
    <div>
      {btn ? (
        <button
          type="button"
          className={`inline-block rounded  leading-normal ${style}`}
          data-te-toggle="modal"
          data-te-target={`#${targetId}`}
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          {btnText}
        </button>
      ) : (
        <p
          type="button"
          className={`inline-block rounded cursor-pointer  leading-normal ${style}`}
          data-te-toggle="modal"
          data-te-target={`#${targetId}`}
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          {cta}
        </p>
      )}
      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden p-2 h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id={`${targetId}`}
        tabIndex="-1"
        aria-labelledby={modalTitle}
        aria-modal="true"
        role="dialog"
      >
        <div
          data-te-modal-dialog-ref
          className={`pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] ${
            size === "normal"
              ? "max-w-[500px]"
              : size === "large"
              ? "max-w-[500px] md:max-w-[800px]"
              : ""
          } `}
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id={modalTitle}
              >
                {modalTitle}
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="relative p-4">{children}</div>
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-mainColor transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Cancel
              </button>
              <button
                onClick={action}
                type="button"
                className="ml-1 inline-block rounded bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:bg-altColor focus:text-white focus:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:outline-none focus:ring-0 active:bg-altColor active:text-white active:shadow-[0_8px_9px_-4prgba(51, 75, 17,0.3)x_,0_4px_18px_0_rgba(51, 75, 17,0.2)]"
                data-te-ripple-init
                data-te-modal-dismiss
                data-te-ripple-color="light"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Modal.defaultProps = {
  confirmText: "proceed",
  size: "normal",
  btn: true,
};

export default Modal;
